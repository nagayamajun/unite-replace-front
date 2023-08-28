import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../types/chatMessage";


export const useUpdateChatHistories = (
  socket: Socket,
  prevChatHistories: ChatMessage[],
  setComponentChatHistories: Dispatch<SetStateAction<ChatMessage[]>>,
) => {
  useEffect(() => {
    socket.on("toClient", (chatData) => {
      const newHistories = [...prevChatHistories];
      newHistories.push(chatData);
      setComponentChatHistories(newHistories)
    });
  }, [prevChatHistories]);
}