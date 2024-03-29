import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChatRepository } from "../modules/chat/chat.repository";
import { ChatRoomParticipantRepository } from "../modules/chatRoomParticipant/chatRoomParticipant.repository";
import { ChatMessage } from "../../../domein/chatMessage";
import { ChatParticipant } from "@/domein/chatParticipant";
import { useGlobalLoading } from "@/adapters/globalState.adapter";


export const useSpecificRoomMessages = (
  roomId: string, 
  setComponentChatHistories: Dispatch<SetStateAction<ChatMessage[]>>
) => {
  //メッセージを送る主体 (ログインユーザー)
  const [sender, setSender] = useState<ChatParticipant>();
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    (async () => {
      if (typeof roomId !== "string") return;
      showLoading()
      const messages = await ChatRepository.findOneRoomHistory(roomId);
      setComponentChatHistories(messages);

      const senderParticipant =
        await ChatRoomParticipantRepository.findByRoomId(roomId);
      setSender(senderParticipant);
      hideLoading();
    })();
  }, [roomId]);

  return { sender }
}