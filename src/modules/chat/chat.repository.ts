import { axiosInstance } from "@/libs/axios";

export const ChatRepository = {
  async findOneRoomHistory(roomId: string): Promise<any> {
    const res = await axiosInstance
      .get(`/chat-room-message/${roomId}`)
      .catch((error) => {
        throw new Error(error);
      });
    return res.data;
  },
};
