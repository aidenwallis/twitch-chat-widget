import {useMemo} from "react";
import {ChatMessage} from "../../models";
import {useThirdPartyEmotes} from "../use-third-party-emotes";
import {MessageParser} from "./message-parser";

export function useMessageContent(message: ChatMessage) {
  const {
    bttvGlobalEmotes,
    bttvUserEmotes,
    ffzGlobalEmotes,
    ffzUserEmotes,
  } = useThirdPartyEmotes();
  const emoteMap = useMemo(
    () => ({
      ...bttvGlobalEmotes,
      ...ffzGlobalEmotes,
      ...ffzUserEmotes,
      ...bttvUserEmotes,
    }),
    [
      bttvGlobalEmotes,
      bttvUserEmotes,
      ffzGlobalEmotes,
      ffzUserEmotes,
    ],
  );

  return MessageParser.parseThirdPartyEmotes(
    emoteMap,
    MessageParser.parseEmotes(message),
  );
}
