import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../types/chatMessage";
import { useLoading } from "@/hooks/useLoading";


export const useUpdateChatHistories = (
  socket: Socket,
  prevChatHistories: ChatMessage[],
  setComponentChatHistories: Dispatch<SetStateAction<ChatMessage[]>>,
) => {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    showLoading();
    socket.on("toClient", (chatData) => {
      const newHistories = [...prevChatHistories];
      newHistories.push(chatData);
      setComponentChatHistories(newHistories)
      hideLoading();
    });
  }, [prevChatHistories]);
}