import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";

export const CorporationRepositry = {
  async create(corporationData: any): Promise<ConfirmModal> {
    try {
      const req = (await axiosInstance.post('corporation', corporationData));
      return {message: "企業作成に成功しました。", success: true}
    } catch(err) {
      return {message: "企業作成に失敗しました。", success: false}
    }
  }
}

