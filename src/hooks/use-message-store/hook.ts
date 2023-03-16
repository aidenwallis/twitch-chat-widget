import {useMemo, useState} from "react";
import {ChatMessage} from "../../models";
import {isEmoteOnly} from "../../settings";
import {useMessageParser} from "../use-message-content";
import {isMessageEmpty} from "../use-message-content/message-parser";

const MAX_BUFFER = isEmoteOnly() ? 10 : 250;
// const MAX_LIFETIME = 60 * 1000;
const SLICE_LEVEL = -Math.abs(MAX_BUFFER - 1);
const emoteOnly = isEmoteOnly();

export function useMessageStore() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const parser = useMessageParser();

  const actions = useMemo(
    () => ({
      getMessages() {
        return messages;
      },
      addMessage(message: ChatMessage) {
        if (emoteOnly) {
          message.parsedNodes = parser(message, true);
          if (isMessageEmpty(message.parsedNodes)) {
            return;
          }
        }

        setMessages((messages) => {
          return [...messages.slice(SLICE_LEVEL), message];
        });
      },
      timeoutUser(login: string) {
        if (login) {
          setMessages((messages) =>
            messages.filter(
              (message) => message.user.login !== login,
            ),
          );
        } else {
          setMessages([]);
        }
      },
      deleteMessage(id: string) {
        setMessages((messages) =>
          messages.filter((message) => message.id !== id),
        );
      },
    }),
    [messages, parser],
  );

  return actions;
}
