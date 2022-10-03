import * as React from "react";
import {ChatMessage} from "../../models";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import {ColorCorrection} from "../../util/color-correction";
import {ChatLineBadges} from "../chat-line-badges";
import {ChatLineContent} from "../chat-line-content";
import classes from "./styles.module.scss";

interface Props {
  channelBadges: TwitchAPIBadgeResponse;
  globalBadges: TwitchAPIBadgeResponse;
  message: ChatMessage;
}

const colorCorrector = new ColorCorrection();

export const ChatLineComponent: React.FunctionComponent<Props> = ({
  channelBadges,
  globalBadges,
  message,
}: Props) => {
  const color = message.user.color
    ? colorCorrector.calculate(message.user.color)
    : "grey";
  return (
    <div className={classes.container}>
      <div className={classes.line}>
        {message.badges.length > 0 && (
          <ChatLineBadges
            channelBadges={channelBadges}
            globalBadges={globalBadges}
            badges={message.badges}
          />
        )}
        <strong style={{color}} className={classes.name}>
          {message.user.displayName}
          {!message.isAction && ":"}
        </strong>
        <ChatLineContent message={message} />
      </div>
    </div>
  );
};

export const ChatLine = React.memo(ChatLineComponent);
