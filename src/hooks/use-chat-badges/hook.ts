import {useEffect, useMemo, useState} from "react";
import {
  BadgeMaps,
  CachedBadges,
  constructMapping,
} from "../../models/fossabot";
import {ApiClient} from "../../util/api-client";

const api = new ApiClient({});

export function useChatBadges(channelID: string) {
  const [globalBadges, setGlobalBadges] = useState<BadgeMaps>({});
  const [channelBadges, setChannelBadges] = useState<BadgeMaps>({});
  const resp = useMemo(
    () => [channelBadges, globalBadges] as const,
    [channelBadges, globalBadges],
  );

  useEffect(() => {
    api
      .get<CachedBadges>(
        "https://api.fossabot.com/v2/cached/twitch/badges/global",
      )
      .then((res) => setGlobalBadges(constructMapping(res.body)))
      .catch((err) =>
        console.error("Failed to get global badges", err),
      );
  }, []);

  useEffect(() => {
    api
      .get<CachedBadges>(
        `https://api.fossabot.com/v2/cached/twitch/badges/users/${encodeURIComponent(
          channelID,
        )}`,
      )
      .then((res) => setChannelBadges(constructMapping(res.body)))
      .catch((err) => console.error("Failed to get badges", err));
  }, [channelID]);

  return resp;
}
