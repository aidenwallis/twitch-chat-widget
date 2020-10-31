import * as React from "react";
import {ChatMessage} from "../../models";
import classes from "./styles.module.scss";

interface Props {
  message: ChatMessage;
}

export const ChatLineContent: React.FunctionComponent<Props> = ({
  message,
}: Props) => {
  return <span className={classes.content}>{message.content}</span>;
};
