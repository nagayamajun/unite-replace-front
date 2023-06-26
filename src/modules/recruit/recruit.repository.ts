import { FormRecruitData } from "@/components/templetes/user/AddRecruit";
import { Recruit } from "@/types/recruit";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import axios from "axios";

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
    console.log(recruitId)
    const recruit = (
      await axiosInstance.get(`/user-recruit/findOne/${recruitId}`).catch((err) => {
        throw new Error(`recruit is not by Id | error: ${err}`);
      })
    ).data;
    return recruit;
  },

  //ユーザーが作成したRecruitを全件取得
  async getMyRecruitsbyFirebaseUID(): Promise<Recruit[]> {
    const myRecruits = (await axiosInstance.get('/user-recruit/my-recruits').catch((err) => {
      throw new Error(`Recruits is not founded ${err} `)
      })
    ).data
    return myRecruits
  },

  //ユーザーに関連するRecruitを全件取得
  async getRelatedRecruitbyUserId(): Promise<Recruit[]> {
    const relatedRecruits = ( await axiosInstance.get('/user-recruit/related-recruits').catch((err) => {
      throw new Error(`Recruits is not founded ${err} `)
    })).data

    return relatedRecruits
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
