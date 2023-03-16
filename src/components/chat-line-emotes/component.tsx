import * as React from "react";
import {ChatMessage} from "../../models";
import classes from "./styles.module.scss";

interface Props {
  message: ChatMessage;
}

export const ChatLineEmotes: React.FunctionComponent<Props> = ({
  message,
}: Props) => {
  return (
    <div>
      <span className={classes.content}>
        {message.parsedNodes.find(
          (node) => node !== null && typeof node === "object",
        )}
      </span>
    </div>
  );
};
