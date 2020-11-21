import * as React from "react";
import {ChatLineEmote} from "../../../components/chat-line-emote";
import {EmoteMap} from "../../../contexts/third-party-emotes";
import {ChatMessage} from "../../../models";

export class MessageParser {
  public static parseThirdPartyEmotes(
    emotes: EmoteMap,
    splits: React.ReactNode[],
  ) {
    const res: React.ReactNode[] = [];
    const _matchWord = (word: string): React.ReactNode => {
      const emote = emotes[word];
      if (emote) {
        return (
          <ChatLineEmote name={emote.name} url={emote.imageUrl} />
        );
      }
      return word;
    };

    let buffer = "";
    for (let i = 0; i < splits.length; ++i) {
      const char = splits[i];
      if (!char) continue;

      if (char === " ") {
        res.push(_matchWord(buffer));
        res.push(" ");
        buffer = "";
      } else if (typeof char === "object") {
        res.push(char);
        buffer = "";
        continue;
      } else {
        buffer += char;
      }
    }

    buffer && res.push(_matchWord(buffer));

    return res;
  }

  public static parseEmotes(message: ChatMessage) {
    const split: React.ReactNode[] = Array.from(message.content);
    for (let i = 0; i < message.emotes.length; ++i) {
      const emote = message.emotes[i];
      for (let j = 0; j < emote.placements.length; ++j) {
        const placement = emote.placements[j];
        const name = split.slice(placement.start, placement.end + 1);
        split[placement.start] = (
          <ChatLineEmote
            name={name.join("")}
            url={`https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`}
          />
        );

        for (let k = placement.start + 1; k <= placement.end; ++k) {
          split[k] = null;
        }
      }
    }

    return split;
  }
}
