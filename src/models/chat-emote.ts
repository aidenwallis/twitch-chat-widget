import {ChatEmotePlacement} from "./chat-emote-placement";

export enum ChatEmoteSize {
  Small = "1.0",
  Medium = "2.0",
  Large = "3.0",
}

export class ChatEmote {
  public constructor(
    public readonly id: string,
    public readonly placements: ChatEmotePlacement[],
  ) {}

  public getURL(size: ChatEmoteSize = ChatEmoteSize.Small): string {
    return `https://static-cdn.jtvnw.net/emoticons/v1/${this.id}/${size}`;
  }
}
