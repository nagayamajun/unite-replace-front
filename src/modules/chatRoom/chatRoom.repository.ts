import { axiosInstance } from "@/libs/axios";
import { ChatRoom } from "@/types/chatRoom";

export const ChatRoomRepository = {
  async findMany(): Promise<ChatRoom[]> {
    const res = await axiosInstance.get("/chat-room").catch((error) => {
      throw new Error("チャットルーム一覧の取得に失敗しました", error);
    });
    return res.data;
  },
};
