import {useEffect, useState} from "react";
import {ChatMessage} from "../../models";
import {TwitchConnection} from "../../util/twitch-connection";

interface HookCallbacks {
  onMessage(message: ChatMessage): void;
  onUserTimeout(login: string): void;
  onDeleteMessage(id: string): void;
}

export function useTwitchConnection(
  login: string,
  callbacks: HookCallbacks,
): TwitchConnection {
  const [connection, setConnection] = useState<TwitchConnection>(
    new TwitchConnection(login),
  );

  useEffect(() => {
    connection.connect();
    return () => {
      connection.disconnect();
      setConnection(new TwitchConnection(login));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    if (connection) {
      connection.onMessage(callbacks.onMessage);
      connection.onUserTimeout(callbacks.onUserTimeout);
      connection.onDeleteMessage(callbacks.onDeleteMessage);
    }
  }, [connection, callbacks]);

  return connection;
}
