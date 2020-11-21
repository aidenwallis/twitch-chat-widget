import {useMemo, useState} from "react";
import {ChatMessage} from "../../models";

const MAX_BUFFER = 10;
// const MAX_LIFETIME = 60 * 1000;
const SLICE_LEVEL = -Math.abs(MAX_BUFFER - 1);

export function useMessageStore() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const actions = useMemo(
    () => ({
      getMessages() {
        return messages;
      },
      addMessage(message: ChatMessage) {
        setMessages((messages) => {
          return [...messages.slice(SLICE_LEVEL), message];
        });
      },
    }),
    [messages],
  );

  return actions;
}
