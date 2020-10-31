import {useEffect, useState} from "react";
import {ChatMessage} from "../../models";
import {TwitchConnection} from "../../util/twitch-connection";

export function useTwitchConnection(
  login: string,
  onMessage: (message: ChatMessage) => void,
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
    connection && connection.onMessage(onMessage);
  }, [connection, onMessage]);

  return connection;
}
