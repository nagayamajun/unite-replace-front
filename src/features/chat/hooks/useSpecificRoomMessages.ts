import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChatRepository } from "../modules/chat/chat.repository";
import { ChatRoomParticipantRepository } from "../modules/chatRoomParticipant/chatRoomParticipant.repository";
import { ChatMessage } from "../types/chatMessage";
import { ChatParticipant } from "../types/chatParticipant";


export const useSpecificRoomMessages = (
  roomId: string, 
  setComponentChatHistories: Dispatch<SetStateAction<ChatMessage[]>>
) => {
  //メッセージを送る主体 (ログインユーザー)
  const [sender, setSender] = useState<ChatParticipant>();

  useEffect(() => {
    (async () => {
      if (typeof roomId !== "string") return;

      const messages = await ChatRepository.findOneRoomHistory(roomId);
      setComponentChatHistories(messages);

      const senderParticipant =
        await ChatRoomParticipantRepository.findByRoomId(roomId);
      setSender(senderParticipant);
    })();
  }, [roomId]);

  return { sender }
}