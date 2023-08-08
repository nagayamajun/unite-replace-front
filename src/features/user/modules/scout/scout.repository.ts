import { FAIL_TO_SEND_SCOUT } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";

export const ScoutRepository = {
  async sendScout(userId: string) {
    try {
      const scoutWithRoomId = (
        await axiosInstance.post("/scout/send-scout", { userId })
      ).data;
      return scoutWithRoomId;
    } catch (error) {
      if (error instanceof Error) {
        error.message = `${FAIL_TO_SEND_SCOUT}\n${error.message}`;
      }
      throw error;
    }
  },
};
