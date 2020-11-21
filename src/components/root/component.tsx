import * as React from "react";
import {ThirdPartyEmotesProvider} from "../../contexts/third-party-emotes";
import {ChatRoot} from "../chat-root";

const channelID = "87763385";
const channelLogin = "aidenwallis";

export const Root: React.FunctionComponent = () => {
  return (
    <ThirdPartyEmotesProvider channelId={channelID}>
      <ChatRoot channelID={channelID} login={channelLogin} />
    </ThirdPartyEmotesProvider>
  );
};
