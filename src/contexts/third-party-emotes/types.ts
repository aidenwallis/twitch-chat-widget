import {ThirdPartyEmote} from "../../models/third-party-emote";

export interface ThirdPartyEmoteState {
  ffzUserEmotes: EmoteMap;
  ffzGlobalEmotes: EmoteMap;
  bttvUserEmotes: EmoteMap;
  bttvGlobalEmotes: EmoteMap;
  seventvUserEmotes: EmoteMap;
  seventvGlobalEmotes: EmoteMap;
}

export type EmoteMap = Record<string, ThirdPartyEmote>;

export interface FrankerfacezEmoticon {
  name: string;
  id: number;
}

export interface FrankerfacezSet {
  emoticons: FrankerfacezEmoticon[];
}

export interface FrankerfacezGlobalBody {
  default_sets: number[];
  sets: Record<string, FrankerfacezSet>;
}

export interface FrankerfacezUserBody {
  room: {set: number};
  sets: Record<string, FrankerfacezSet>;
}

export interface BetterttvEmote {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}

export type BetterttvGlobalBody = BetterttvEmote[];

export interface BetterttvUserBody {
  channelEmotes: BetterttvEmote[];
  sharedEmotes: BetterttvEmote[];
}

export interface SeventvEmote {
  id: string;
  name: string;
}

export type SeventvGlobalBody = SeventvEmote[];

export type SeventvUserBody = SeventvEmote[];
