import * as React from "react";
import {
  getBTTVGlobalEmotes,
  getBTTVUserEmotes,
  getFFZGlobalEmotes,
  getFFZUserEmotes,
} from "./helpers";
import {EmoteMap, ThirdPartyEmoteState} from "./types";

export const ThirdPartyEmotesContext = React.createContext<ThirdPartyEmoteState>(
  {
    bttvUserEmotes: {},
    bttvGlobalEmotes: {},
    ffzUserEmotes: {},
    ffzGlobalEmotes: {},
  },
);

interface Props {
  channelId: string;
  children: React.ReactNode;
}

export const ThirdPartyEmotesProvider: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const [ffzUserEmotes, setFfzUserEmotes] = React.useState<EmoteMap>(
    {},
  );
  const [
    ffzGlobalEmotes,
    setFfzGlobalEmotes,
  ] = React.useState<EmoteMap>({});
  const [
    bttvUserEmotes,
    setBttvUserEmotes,
  ] = React.useState<EmoteMap>({});
  const [
    bttvGlobalEmotes,
    setBttvGlobalEmotes,
  ] = React.useState<EmoteMap>({});

  React.useEffect(() => {
    getFFZGlobalEmotes().then(setFfzGlobalEmotes);
    getBTTVGlobalEmotes().then(setBttvGlobalEmotes);
  }, []);

  React.useEffect(() => {
    getFFZUserEmotes(props.channelId).then(setFfzUserEmotes);
    getBTTVUserEmotes(props.channelId).then(setBttvUserEmotes);
  }, [props.channelId]);

  return (
    <ThirdPartyEmotesContext.Provider
      value={{
        bttvGlobalEmotes,
        bttvUserEmotes,
        ffzUserEmotes,
        ffzGlobalEmotes,
      }}
    >
      {props.children}
    </ThirdPartyEmotesContext.Provider>
  );
};
