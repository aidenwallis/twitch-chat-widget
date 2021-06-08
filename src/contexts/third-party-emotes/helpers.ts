import {
  ThirdPartyEmote,
  ThirdPartyEmoteProvider,
} from "../../models/third-party-emote";
import {ApiClient} from "../../util/api-client";
import {
  BetterttvGlobalBody,
  BetterttvUserBody,
  EmoteMap,
  FrankerfacezGlobalBody,
  FrankerfacezSet,
  FrankerfacezUserBody,
  SeventvGlobalBody,
  SeventvUserBody,
} from "./types";

const api = new ApiClient({});

export const parseFFZSet = (set: FrankerfacezSet) => {
  const emoteMap: EmoteMap = {};
  for (let i = 0; i < set?.emoticons?.length ?? 0; ++i) {
    const emote = set?.emoticons[i];
    if (!emote) continue;

    emoteMap[emote.name] = new ThirdPartyEmote(
      emote.id.toString(),
      ThirdPartyEmoteProvider.FrankerFaceZ,
      emote.name,
      ThirdPartyEmote.getFrankerfacezImageURL(emote.id),
    );
  }

  return emoteMap;
};

export const getFFZGlobalEmotes = (): Promise<EmoteMap> =>
  api
    .get<FrankerfacezGlobalBody>(
      "https://api.frankerfacez.com/v1/set/global",
    )
    .then((res) =>
      (res.body?.default_sets ?? [])
        .map((setId) =>
          parseFFZSet(res?.body?.sets[setId.toString()] || {}),
        )
        .reduce((acc, cur) => ({...acc, ...cur}), {} as EmoteMap),
    )
    .catch((error) => {
      console.error("Failed to get FFZ global emotes", error);
      return {};
    });

export const getFFZUserEmotes = (
  channelId: string,
): Promise<EmoteMap> =>
  api
    .get<FrankerfacezUserBody>(
      `https://api.frankerfacez.com/v1/room/id/${encodeURIComponent(
        channelId,
      )}`,
    )
    .then((res) =>
      parseFFZSet(
        res?.body?.sets[res.body.room.set ?? "".toString()] || {
          emoticons: [],
        },
      ),
    )
    .catch((error) => {
      console.error("Failed to get FFZ user emotes", error);
      return {};
    });

export const getBTTVGlobalEmotes = (): Promise<EmoteMap> =>
  api
    .get<BetterttvGlobalBody>(
      "https://api.betterttv.net/3/cached/emotes/global",
    )
    .then((res) =>
      res.body.reduce((acc, cur) => {
        acc[cur.code] = new ThirdPartyEmote(
          cur.id,
          ThirdPartyEmoteProvider.BetterTTV,
          cur.code,
          ThirdPartyEmote.getBetterttvImageURL(cur.id),
        );
        return acc;
      }, {} as EmoteMap),
    )
    .catch((error) => {
      console.error("Failed to get BTTV global emotes", error);
      return {};
    });

export const getBTTVUserEmotes = (
  channelId: string,
): Promise<EmoteMap> =>
  api
    .get<BetterttvUserBody>(
      `https://api.betterttv.net/3/cached/users/twitch/${encodeURIComponent(
        channelId,
      )}`,
    )
    .then((res) =>
      [
        ...(res?.body?.sharedEmotes ?? []),
        ...(res.body.channelEmotes ?? []),
      ].reduce((acc, cur) => {
        acc[cur.code] = new ThirdPartyEmote(
          cur.id,
          ThirdPartyEmoteProvider.BetterTTV,
          cur.code,
          ThirdPartyEmote.getBetterttvImageURL(cur.id),
        );
        return acc;
      }, {} as EmoteMap),
    )
    .catch((error) => {
      console.error("Failed to get BTTV user emotes", error);
      return {};
    });

export const get7TVGlobalEmotes = (): Promise<EmoteMap> =>
  api
    .get<SeventvGlobalBody>("https://api.7tv.app/v2/emotes/global")
    .then((res) =>
      res.body.reduce((acc, cur) => {
        acc[cur.name] = new ThirdPartyEmote(
          cur.id,
          ThirdPartyEmoteProvider.BetterTTV,
          cur.name,
          ThirdPartyEmote.getSevenTVImageURL(cur.id),
        );
        return acc;
      }, {} as EmoteMap),
    )
    .catch((error) => {
      console.error("Failed to get 7TV global emotes", error);
      return {};
    });

export const get7TVUserEmotes = (
  channel: string,
): Promise<EmoteMap> =>
  api
    .get<SeventvUserBody>(
      `https://api.7tv.app/v2/users/${encodeURIComponent(
        channel,
      )}/emotes`,
    )
    .then((res) =>
      [...(res?.body ?? [])].reduce((acc, cur) => {
        acc[cur.name] = new ThirdPartyEmote(
          cur.id,
          ThirdPartyEmoteProvider.BetterTTV,
          cur.name,
          ThirdPartyEmote.getSevenTVImageURL(cur.id),
        );
        return acc;
      }, {} as EmoteMap),
    )
    .catch((error) => {
      console.error("Failed to get 7TV user emotes", error);
      return {};
    });
