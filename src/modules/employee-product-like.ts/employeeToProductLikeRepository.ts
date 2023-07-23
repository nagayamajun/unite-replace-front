import { FAIL_TO_PUSH_LIKE } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";

export const employeeToProductLikeRepository = {
  //いいねする
  async addLike(productId: string): Promise<ConfirmModal | undefined> {
    try {
      await axiosInstance.post('/employee-to-product-like', { productId })
    } catch (error) {
      const isTypeSafeError = error instanceof Error
      return {
        success: false,
        message: `${FAIL_TO_PUSH_LIKE}\n${isTypeSafeError ? error.message : ""}`,
      }
    }
  },

};
