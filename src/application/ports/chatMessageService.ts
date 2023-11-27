import { ChatMessage } from "@/domein/chatMessage";

export interface ChatMessageService {
  getSpecificRoomChatHistory: (roomId: string) =>  Promise<ChatMessage[]>;
};