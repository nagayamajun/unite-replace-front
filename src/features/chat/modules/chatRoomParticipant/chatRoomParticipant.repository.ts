import { axiosInstance } from "@/libs/axios";
import axios from "axios";

export const ChatRoomParticipantRepository = {
  async findByRoomId(roomId: string): Promise<any> {
    const res = await axiosInstance
      .get(`/chat-room-participant/${roomId}`)
      .catch((error) => {
        throw new Error("チャット参加者の取得に失敗しました", error);
      });

    return res.data;
  },
};
