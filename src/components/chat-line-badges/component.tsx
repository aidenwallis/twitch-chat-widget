import * as React from "react";
import {ChatBadge} from "../../models/chat-badge";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import classes from "./styles.module.scss";

interface Props {
  channelBadges: TwitchAPIBadgeResponse;
  globalBadges: TwitchAPIBadgeResponse;
  badges: ChatBadge[];
}

export const ChatLineBadges: React.FunctionComponent<Props> = (
  props: Props,
) => {
  return (
    <span className={classes.badges}>
      {props.badges.map((badge) => {
        const badgeSrc =
          props.channelBadges.badge_sets[badge.name]?.versions[
            badge.version
          ]?.image_url_1x ||
          props.globalBadges.badge_sets[badge.name]?.versions[
            badge.version
          ].image_url_1x ||
          "";
        if (!badgeSrc) return null;
        return (
          <span key={badge.name}>
            <img
              className={classes.badge}
              alt={badge.name}
              src={badgeSrc}
            />
          </span>
        );
      })}
    </span>
  );
};
