import * as React from "react";
import {
  get7TVGlobalEmotes,
  get7TVUserEmotes,
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
    seventvGlobalEmotes: {},
    seventvUserEmotes: {},
  },
);

interface Props {
  channelId: string;
  login: string;
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
  const [
    seventvGlobalEmotes,
    set7TVGlobalEmotes,
  ] = React.useState<EmoteMap>({});
  const [
    seventvUserEmotes,
    set7TVUserEmotes,
  ] = React.useState<EmoteMap>({});

  React.useEffect(() => {
    getFFZGlobalEmotes().then(setFfzGlobalEmotes);
    getBTTVGlobalEmotes().then(setBttvGlobalEmotes);
    get7TVGlobalEmotes().then(set7TVGlobalEmotes);
  }, []);

  React.useEffect(() => {
    getFFZUserEmotes(props.channelId).then(setFfzUserEmotes);
    getBTTVUserEmotes(props.channelId).then(setBttvUserEmotes);
    get7TVUserEmotes(props.login).then(set7TVUserEmotes);
  }, [props.channelId, props.login]);

  return (
    <ThirdPartyEmotesContext.Provider
      value={{
        bttvGlobalEmotes,
        bttvUserEmotes,
        ffzUserEmotes,
        ffzGlobalEmotes,
        seventvGlobalEmotes,
        seventvUserEmotes,
      }}
    >
      {props.children}
    </ThirdPartyEmotesContext.Provider>
  );
};
