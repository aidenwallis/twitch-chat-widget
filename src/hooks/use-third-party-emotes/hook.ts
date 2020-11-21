import {useContext} from "react";
import {
  ThirdPartyEmotesContext,
  ThirdPartyEmoteState,
} from "../../contexts/third-party-emotes";

export function useThirdPartyEmotes(): ThirdPartyEmoteState {
  const context = useContext(ThirdPartyEmotesContext);
  return context;
}
