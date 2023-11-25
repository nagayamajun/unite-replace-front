import { ChatRoomParticipantService } from "@/application/ports/chatRoomParticipantService";
import { ChatRoomParticipantRequest } from "@/infrastructures/requests/chat-room-participant.request";

export const useChatRoomParticipant = (): ChatRoomParticipantService => {
  return {
    findByRoomId(roomId) {
        return ChatRoomParticipantRequest.findByRoomId(roomId);
    },
  }
}