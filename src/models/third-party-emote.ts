export enum ThirdPartyEmoteProvider {
  BetterTTV,
  FrankerFaceZ,
  SevenTV,
}

export class ThirdPartyEmote {
  public constructor(
    public readonly id: string,
    public readonly provider: ThirdPartyEmoteProvider,
    public readonly name: string,
    public readonly imageUrl: string,
  ) {}

  public static getFrankerfacezImageURL(emoteId: number) {
    return `https://cdn.frankerfacez.com/emote/${encodeURIComponent(
      emoteId,
    )}/1`;
  }

  public static getBetterttvImageURL(emoteId: string) {
    return `https://cdn.betterttv.net/emote/${encodeURIComponent(
      emoteId,
    )}/1x`;
  }

  public static getSevenTVImageURL(emoteId: string) {
    console.log(emoteId);
    return `https://cdn.7tv.app/emote/${encodeURIComponent(
      emoteId,
    )}/1x`;
  }
}
