import { ChatMessageService } from "@/application/ports/chatMessageService";
import { ChatMessageRequest } from "@/infrastructures/requests/chat-message.reqest";


export const useChatMessage = (): ChatMessageService => {
  return {
    getSpecificRoomChatHistory(roomId) {
        return ChatMessageRequest.getSpecificRoomChatHistory(roomId);
    },
  }
}