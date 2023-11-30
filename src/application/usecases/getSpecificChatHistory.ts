import { useChatMessage } from "@/adapters/chatMessage.adapter";
import { useChatRoomParticipant } from "@/adapters/chatRoomParticipant.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { useSocket } from "@/adapters/socket.adapter";
import { ChatMessage } from "@/domein/chatMessage";
import { ChatParticipant } from "@/domein/chatParticipant";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useRef, useState } from "react";

export const useSpecificChatHistory = (roomId: string) => {
  //メッセージを送る主体 (ログインユーザー)
  const [sender, setSender] = useState<ChatParticipant>();

  const [ chatHistories, setComponentChatHistories] = useState<ChatMessage[]>([]);
  const endMessageRef = useRef<HTMLDivElement>(null);

  const loading = useLoading();
  const notice = useNotice();
  const chatMessageService = useChatMessage();
  const chatRoomParticipantService = useChatRoomParticipant();

  const { setSocket} = useSocket();
  const { socket } = setSocket();

  useEffect(() => {
    (async () => {
      if (typeof roomId !== "string") return;
      try {
        loading.showLoading()
        const messages = await chatMessageService.getSpecificRoomChatHistory(roomId);
        setComponentChatHistories(messages);
  
        const senderParticipant = await chatRoomParticipantService.findByRoomId(roomId);
        setSender(senderParticipant);
        loading.hideLoading();
      } catch (error: unknown) {
        loading.hideLoading();
        const isTypeSafeError = error instanceof Error;
        notice.error(`取得に失敗しました。\n${isTypeSafeError && error.message}`)
      }
    })();
  }, [roomId]);

  useEffect(() => {
    socket.on("toClient", (chatData) => {
      setComponentChatHistories([...chatHistories, chatData])
    });
  }, [chatHistories]);

  return {
    chatHistories,
    sender,
    endMessageRef
  };
}