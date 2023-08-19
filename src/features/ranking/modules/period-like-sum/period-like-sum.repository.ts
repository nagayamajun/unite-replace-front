import { FAIL_TO_GET_PRODUCT } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";

export const PeriodLikeSumRepository = {
  //上位10のproductを取得
  async getTopTenPeriodLikeSums() {
    const periodLikeSums = (
      await axiosInstance.get(`/period-like-sum`).catch(() => {
        throw new Error(FAIL_TO_GET_PRODUCT);
      })
    ).data;

    return periodLikeSums
  }
};
