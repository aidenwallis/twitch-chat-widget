import {useEffect, useState} from "react";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import {twitchApiClient} from "../../util/twitch-api-client";

export function useChatBadges(
  channelID: string,
): TwitchAPIBadgeResponse {
  const [badges, setBadges] = useState<TwitchAPIBadgeResponse>({});

  useEffect(() => {
    twitchApiClient
      .get<TwitchAPIBadgeResponse>(
        `https://api.twitch.tv/v5/chat/${channelID}/badges`,
      )
      .then((res) => setBadges(res.body))
      .catch((err) => console.error("Failed to get badges", err));
  }, [channelID]);

  return badges;
}
