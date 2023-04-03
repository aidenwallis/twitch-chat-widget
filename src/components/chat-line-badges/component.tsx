import * as React from "react";
import {ChatBadge} from "../../models/chat-badge";
import type {BadgeMaps} from "../../models/fossabot";
import classes from "./styles.module.scss";

interface Props {
  channelBadges: BadgeMaps;
  globalBadges: BadgeMaps;
  badges: ChatBadge[];
}

export const ChatLineBadges: React.FunctionComponent<Props> = (
  props: Props,
) => {
  return (
    <span className={classes.badges}>
      {props.badges.map((badge) => {
        const badgeSrc =
          props?.channelBadges?.[badge.name]?.[badge.version]
            ?.asset_1x?.url ||
          props?.globalBadges?.[badge.name]?.[badge.version]?.asset_1x
            ?.url ||
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
