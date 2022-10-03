import {useMemo, useState} from "react";
import {ChatMessage} from "../../models";

const MAX_BUFFER = 250;
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
    [messages],
  );

  return actions;
}
