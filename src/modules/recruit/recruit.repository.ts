import { FormRecruitData } from "@/components/templetes/user/AddRecruit";
import { Recruit } from "@/types/recruit";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";

export const recruitRepository = {
  //募集の一覧取得
  async getRecruits(): Promise<Recruit[]> {
    const recruits = (
      await axiosInstance.get("/user-recruit").catch((err) => {
        throw new Error(`recruits is not found | ${err}`);
      })
    ).data;
    return recruits;
  },

  //特定のuidを持つ募集の取得
  async getRecruitById(recruitId: string): Promise<Recruit> {
    const recruit = (
      await axiosInstance.get(`/user-recruit/${recruitId}`).catch((err) => {
        throw new Error(`recruit is not by Id | error: ${err}`);
      })
    ).data;
    return recruit;
  },
  //募集の作成
  async createRecuit(
    recruitData: FormRecruitData,
    userId?: string
  ): Promise<ConfirmModal> {
    try {
      const req = await axiosInstance.post("/user-recruit", recruitData);
      return { message: "募集作成に成功しました。", success: true };
    } catch (error) {
      return { message: "募集作成に失敗しました。", success: false };
    }
  },
  //募集の削除
};
