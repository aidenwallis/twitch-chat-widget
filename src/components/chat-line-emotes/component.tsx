import * as React from "react";
import {useMessageContent} from "../../hooks/use-message-content";
import {isMessageEmpty} from "../../hooks/use-message-content/message-parser";
import {ChatMessage} from "../../models";
import classes from "./styles.module.scss";

interface Props {
  message: ChatMessage;
}

export const ChatLineEmotes: React.FunctionComponent<Props> = ({
  message,
}: Props) => {
  const content = useMessageContent(message, true);
  if (isMessageEmpty(content)) {
    return null;
  }

  return (
    <div>
      <span className={classes.content}>{content}</span>
    </div>
  );
};
