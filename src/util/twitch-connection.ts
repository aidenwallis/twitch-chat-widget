import {parse as parseMessage} from "irc-message-ts";
import {ChatMessage} from "../models";

type MessageCallback = (message: ChatMessage) => void;

enum ConnectionState {
  Connected,
  Connecting,
  Disconnected,
}

const MAX_RECONNECT_TIMEOUT = 10 * 1000;
const newlineRx = /[\r\n]+/;

export class TwitchConnection {
  private conn?: WebSocket;
  private connectionAttempts = 0;
  private forceDisconnect = false;
  private state = ConnectionState.Disconnected;
  private messageCallback?: MessageCallback;
  private userTimeoutCallback?: (login: string) => void;
  private deleteMessageCallback?: (id: string) => void;
  private connectionTimeout?: NodeJS.Timer;

  public constructor(private login: string) {}

  public connect(): void {
    if (this.forceDisconnect) return;
    if (this.state !== ConnectionState.Disconnected) return;

    ++this.connectionAttempts;

    this.state = ConnectionState.Connecting;
    // give 5s to connect
    this.connectionTimeout = setTimeout(
      () => this.handleDisconnect(),
      5000,
    );

    this.conn = new WebSocket("wss://irc-ws.chat.twitch.tv/");

    this.conn.onopen = () => {
      this.connectionAttempts = 0;
      this.connectionTimeout && clearTimeout(this.connectionTimeout);

      this.send("CAP REQ :twitch.tv/tags twitch.tv/commands");
      this.send("PASS oauth:123123132");
      this.send("NICK justinfan123");
      this.send("JOIN #" + this.login);
    };

    this.conn.onmessage = (event) => {
      if (!event.data) return;
      const lines = event.data.split(newlineRx);
      for (let i = 0; i < lines.length; ++i) {
        this.handleLine(lines[i]);
      }
    };

    this.conn.onerror = () => this.handleDisconnect();
    this.conn.onclose = () => this.handleDisconnect();
  }

  public onMessage(cb: MessageCallback): void {
    this.messageCallback = cb;
  }

  public onUserTimeout(cb: (login: string) => void) {
    this.userTimeoutCallback = cb;
  }

  public onDeleteMessage(cb: (id: string) => void) {
    this.deleteMessageCallback = cb;
  }

  private handleLine(line: string) {
    if (!line) return;
    const parsed = parseMessage(line);
    if (!parsed) return;

    switch (parsed.command) {
      case "PING": {
        return this.send(line.replace("PING", "PONG"));
      }

      case "PRIVMSG": {
        return (
          this.messageCallback &&
          this.messageCallback(new ChatMessage(parsed))
        );
      }

      case "CLEARCHAT": {
        return (
          this.userTimeoutCallback &&
          this.userTimeoutCallback(parsed.trailing || "")
        );
      }

      case "CLEARMSG": {
        return (
          parsed.tags["target-msg-id"] &&
          this.deleteMessageCallback &&
          this.deleteMessageCallback(parsed.tags["target-msg-id"])
        );
      }
    }
  }

  private handleDisconnect() {
    // prevent duplicate reconnection attempts
    if (this.state === ConnectionState.Disconnected) return;
    this.state = ConnectionState.Disconnected;

    this.conn && this.conn.close();

    console.log("Disconnected from Twitch.");

    setTimeout(
      () => this.connect(),
      Math.min(this.connectionAttempts * 2000, MAX_RECONNECT_TIMEOUT),
    );
  }

  public disconnect(): void {
    this.forceDisconnect = true;
    this.conn && this.conn.close();
  }

  private send(line: string) {
    if (line.includes("\n")) return;

    if (this.conn && this.conn.readyState == WebSocket.OPEN)
      this.conn.send(line + "\r\n");
  }
}
