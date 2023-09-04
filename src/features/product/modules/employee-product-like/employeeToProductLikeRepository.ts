import { FAIL_TO_PUSH_LIKE } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ToastResult } from "@/types/toast";

export const employeeToProductLikeRepository = {
  //いいねする
  async addLike({productId}: {productId: string}): Promise<ToastResult | undefined> {
    try {
      await axiosInstance.post('/employee-to-product-like', { productId })
    } catch (error) {
      const isTypeSafeError = error instanceof Error
      return {
        style: 'failed',
        message: `${FAIL_TO_PUSH_LIKE}\n${isTypeSafeError ? error.message : ""}`,
      }
    }
  },

};
