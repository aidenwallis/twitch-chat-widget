import * as React from "react";
import {ChatMessage} from "../../models";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import {ChatLineBadges} from "../chat-line-badges";
import {ChatLineContent} from "../chat-line-content";
import classes from "./styles.module.scss";

interface Props {
  badges: TwitchAPIBadgeResponse;
  message: ChatMessage;
}

export const ChatLine: React.FunctionComponent<Props> = ({
  badges,
  message,
}: Props) => {
  return (
    <div className={classes.line}>
      {message.badges.length > 0 && (
        <ChatLineBadges badgeMap={badges} badges={message.badges} />
      )}
      <strong
        style={{color: message.user.color}}
        className={classes.name}
      >
        {message.user.displayName}:
      </strong>
      <ChatLineContent message={message} />
    </div>
  );
};
