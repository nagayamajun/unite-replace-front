import { ChatParticipant } from "@/domein/chatParticipant";

export interface ChatRoomParticipantService {
  findByRoomId: (roomId: string) => Promise<ChatParticipant>
}