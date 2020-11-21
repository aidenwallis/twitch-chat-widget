import {useEffect, useMemo, useState} from "react";
import {TwitchAPIBadgeResponse} from "../../models/twitch-api";
import {ApiClient} from "../../util/api-client";

const twitchApiClient = new ApiClient({});

type BadgeResponses = [
  TwitchAPIBadgeResponse,
  TwitchAPIBadgeResponse,
];

export function useChatBadges(channelID: string): BadgeResponses {
  const [
    globalBadges,
    setGlobalBadges,
  ] = useState<TwitchAPIBadgeResponse>({badge_sets: {}});
  const [
    channelBadges,
    setChannelBadges,
  ] = useState<TwitchAPIBadgeResponse>({
    badge_sets: {},
  });
  const resp = useMemo<BadgeResponses>(
    () => [channelBadges, globalBadges],
    [channelBadges, globalBadges],
  );

  useEffect(() => {
    twitchApiClient
      .get<TwitchAPIBadgeResponse>(
        "https://badges.twitch.tv/v1/badges/global/display?language=en",
      )
      .then((res) => setGlobalBadges(res.body))
      .catch((err) =>
        console.error("Failed to get global badges", err),
      );
  }, []);

  useEffect(() => {
    twitchApiClient
      .get<TwitchAPIBadgeResponse>(
        `https://badges.twitch.tv/v1/badges/channels/${encodeURIComponent(
          channelID,
        )}/display?language=en`,
      )
      .then((res) => setChannelBadges(res.body))
      .catch((err) => console.error("Failed to get badges", err));
  }, [channelID]);

  return resp;
}
