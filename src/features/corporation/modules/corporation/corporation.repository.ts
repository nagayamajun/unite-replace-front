import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { Corporation } from "../../types/corporation";
import {
  FAIL_TO_UPDATE_CORPORATION,
  SUCCESS_IN_UPDATE_CORPORATION,
} from "@/constants/constants";

export const CorporationRepository = {
  async getById(id: string): Promise<Corporation> {
    const res = await axiosInstance.get(`corporation/${id}`).catch((error) => {
      throw new Error(error);
    });
    return res.data;
  },

  async create(corporationData: any): Promise<ConfirmModal> {
    try {
      const req = await axiosInstance.post("corporation", corporationData);
      return { message: "企業作成に成功しました。", success: true };
    } catch (err) {
      return { message: "企業作成に失敗しました。", success: false };
    }
  },

  async update(
    corporationId: string,
    corporationData: any
  ): Promise<ConfirmModal & { data: Corporation | null }> {
    try {
      const corporation = (
        await axiosInstance.put(
          `corporation/${corporationId}`,
          corporationData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
      ).data;
      return {
        data: corporation,
        message: SUCCESS_IN_UPDATE_CORPORATION,
        success: true,
      };
    } catch (err) {
      return {
        data: null,
        message: FAIL_TO_UPDATE_CORPORATION,
        success: false,
      };
    }
  },
};
