import * as React from "react";
import {useChatBadges} from "../../hooks/use-chat-badges";
import {useMessageStore} from "../../hooks/use-message-store";
import {useTwitchConnection} from "../../hooks/use-twitch-connection";
import {ChatLine} from "../chat-line";
import styles from "./styles.module.scss";

interface Props {
  channelID: string;
  login: string;
}

export const ChatRoot: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const [channelBadges, globalBadges] = useChatBadges(
    props.channelID,
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const messages = useMessageStore();

  useTwitchConnection(props.login, (message) =>
    messages.addMessage(message),
  );

  return (
    <div className={styles.container} ref={containerRef}>
      {messages.getMessages().map((message) => (
        <ChatLine
          channelBadges={channelBadges}
          containerRef={containerRef}
          globalBadges={globalBadges}
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};
