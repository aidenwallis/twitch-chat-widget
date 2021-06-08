import * as React from "react";
import {ThirdPartyEmotesProvider} from "../../contexts/third-party-emotes";
import {SETTINGS} from "../../settings";
import {ChatRoot} from "../chat-root";

export const Root: React.FunctionComponent = () => {
  return (
    <ThirdPartyEmotesProvider
      channelId={SETTINGS.TWITCH_ID}
      channel={SETTINGS.TWITCH_LOGIN}
    >
      <ChatRoot
        channelID={SETTINGS.TWITCH_ID}
        login={SETTINGS.TWITCH_LOGIN}
      />
    </ThirdPartyEmotesProvider>
  );
};
