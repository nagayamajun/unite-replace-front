import { axiosInstance } from "@/libs/axios";

export const ChatRoomParticipantRequest = {
  async findByRoomId(roomId: string) {
    const response = await axiosInstance.get(`/chat-room-participant/${roomId}`);
    return response.data;
  },
};