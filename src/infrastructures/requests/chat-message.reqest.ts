import { axiosInstance } from "@/libs/axios";

export const ChatMessageRequest = {
  async getSpecificRoomChatHistory(roomId: string) {
    const response = await axiosInstance.get(`/chat-room-message/${roomId}`);
    return response.data;
  },
};
