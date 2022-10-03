import * as React from "react";
import {useMessageContent} from "../../hooks/use-message-content";
import {ChatMessage} from "../../models";
import classes from "./styles.module.scss";

interface Props {
  color: string;
  message: ChatMessage;
}

export const ChatLineContent: React.FunctionComponent<Props> = ({
  color,
  message,
}: Props) => {
  const content = useMessageContent(message);

  return (
    <span
      className={classes.content}
      style={{fontStyle: message.isAction ? "italic" : "normal"}}
    >
      {content}
    </span>
  );
};
