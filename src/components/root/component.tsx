import * as React from "react";
import {ThirdPartyEmotesProvider} from "../../contexts/third-party-emotes";
import {ChatRoot} from "../chat-root";
import {SETTINGS} from "../../settings";

export const Root: React.FunctionComponent = () => {
  return (
    <ThirdPartyEmotesProvider channelId={SETTINGS.TWITCH_ID}>
      <ChatRoot channelID={SETTINGS.TWITCH_ID} login={SETTINGS.TWITCH_LOGIN} />
    </ThirdPartyEmotesProvider>
  );
};
