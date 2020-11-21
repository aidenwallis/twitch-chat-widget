import * as React from "react";
import {ThirdPartyEmotesProvider} from "../../contexts/third-party-emotes";
import {ChatRoot} from "../chat-root";

declare const process: {
  env: {
    REACT_APP_TWITCH_LOGIN: string;
    REACT_APP_TWITCH_ID: string;
  };
};

const channelID = process.env.REACT_APP_TWITCH_ID || "87763385";
const channelLogin =
  process.env.REACT_APP_TWITCH_LOGIN || "aidenwallis";

export const Root: React.FunctionComponent = () => {
  return (
    <ThirdPartyEmotesProvider channelId={channelID}>
      <ChatRoot channelID={channelID} login={channelLogin} />
    </ThirdPartyEmotesProvider>
  );
};
