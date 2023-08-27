import { FAIL_TO_GET_PRODUCT } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";

export const PeriodLikeSumRepository = {
  // 上位10のproductを取得
  async getTopTenPeriodLikeSums() {
    try {
      const periodLikeSums = (
        await axiosInstance.get(`/period-like-sum`)
      ).data;

      return periodLikeSums;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(FAIL_TO_GET_PRODUCT);
      }
      throw error;
    }
  }
};
