import * as React from "react";
import {ChatBadge} from "../../models/chat-badge";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import classes from "./styles.module.scss";

interface Props {
  badgeMap: TwitchAPIBadgeResponse;
  badges: ChatBadge[];
}

export const ChatLineBadges: React.FunctionComponent<Props> = (
  props: Props,
) => {
  return (
    <span className={classes.badges}>
      {props.badges.map((badge) => {
        const badgeSrc = props.badgeMap[badge.name]?.image ?? "";
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
