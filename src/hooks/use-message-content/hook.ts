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
    seventvGlobalEmotes,
    seventvUserEmotes,
  } = useThirdPartyEmotes();
  const emoteMap = useMemo(
    () => ({
      ...bttvGlobalEmotes,
      ...ffzGlobalEmotes,
      ...ffzUserEmotes,
      ...bttvUserEmotes,
      ...seventvGlobalEmotes,
      ...seventvUserEmotes,
    }),
    [
      bttvGlobalEmotes,
      bttvUserEmotes,
      ffzGlobalEmotes,
      ffzUserEmotes,
      seventvGlobalEmotes,
      seventvUserEmotes,
    ],
  );

  return MessageParser.parseThirdPartyEmotes(
    emoteMap,
    MessageParser.parseEmotes(message),
  );
}
