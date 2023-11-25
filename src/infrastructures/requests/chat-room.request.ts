import { axiosInstance } from "@/libs/axios";

export const ChatRoomRequest = {
  async findMany() {
    const response = await axiosInstance.get("/chat-room");
    return response.data;
  },
};
