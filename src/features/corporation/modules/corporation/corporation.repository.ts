import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { Corporation } from "../../types/corporation";
import {
  FAIL_TO_SIGN_UP,
  FAIL_TO_UPDATE_CORPORATION,
  SUCCESS_IN_SIGN_UP,
  SUCCESS_IN_UPDATE_CORPORATION,
} from "@/constants/constants";
import { ToastResult } from "@/types/toast";

export const CorporationRepository = {
  async getById(id: string): Promise<Corporation> {
    const res = await axiosInstance.get(`corporation/${id}`).catch((error) => {
      throw new Error(error);
    });
    return res.data;
  },

  async create({corporationData}: { corporationData: any }): Promise<ToastResult> {
    try {
      await axiosInstance.post("corporation", corporationData);
      return { message: SUCCESS_IN_SIGN_UP, style: 'success' };
    } catch (err: unknown) {
      const isTypeSafeError = err instanceof Error;
      return { 
        message: `${FAIL_TO_SIGN_UP}\n${isTypeSafeError && err}`, 
        style: 'failed' 
      };
    }
  },

  async update(
    { corporationId, corporationData }: { corporationId: string, corporationData: any }
  ): Promise<ToastResult> {
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
        style: 'success',
      };
    } catch (err: unknown) {
      const isTypeSafeError = err instanceof Error
      return {
        message: `${FAIL_TO_UPDATE_CORPORATION}\n${isTypeSafeError ? err.message : ""}`,
        style: 'failed',
      };
    }
  },
};
