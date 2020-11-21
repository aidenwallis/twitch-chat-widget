import * as React from "react";
import {ChatMessage} from "../../models";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import {ChatLineBadges} from "../chat-line-badges";
import {ChatLineContent} from "../chat-line-content";
import classes from "./styles.module.scss";

interface Props {
  channelBadges: TwitchAPIBadgeResponse;
  globalBadges: TwitchAPIBadgeResponse;
  message: ChatMessage;
}

export const ChatLineComponent: React.FunctionComponent<Props> = ({
  channelBadges,
  globalBadges,
  message,
}: Props) => {
  return (
    <div className={classes.line}>
      {message.badges.length > 0 && (
        <ChatLineBadges
          channelBadges={channelBadges}
          globalBadges={globalBadges}
          badges={message.badges}
        />
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

export const ChatLine = React.memo(ChatLineComponent);
