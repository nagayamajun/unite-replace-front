import { ChatRoomService } from "@/application/ports/chatRoomService";
import { ChatRoomRequest } from "@/infrastructures/requests/chat-room.request";


export const useChatRoom = (): ChatRoomService => {
  return {
    findMany() {
        return ChatRoomRequest.findMany();
    }
  }
}