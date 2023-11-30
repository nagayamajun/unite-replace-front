import { Dispatch, SetStateAction, useEffect } from "react";
import { Socket } from "socket.io-client";

import { ChatMessage } from "@/domein/chatMessage";
import { useGlobalLoading } from "@/adapters/globalState.adapter";


export const useUpdateChatHistories = (
  socket: Socket,
  prevChatHistories: ChatMessage[],
  setComponentChatHistories: Dispatch<SetStateAction<ChatMessage[]>>,
) => {
  const { showLoading, hideLoading } = useGlobalLoading();
  useEffect(() => {
    showLoading();
    socket.on("toClient", (chatData) => {
      const newHistories = [...prevChatHistories];
      newHistories.push(chatData);
      setComponentChatHistories(newHistories)
    });
    hideLoading();
  }, [prevChatHistories]);
}