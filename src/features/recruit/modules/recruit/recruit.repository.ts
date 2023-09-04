import { FormRecruitData, Recruit } from "@/features/recruit/types/recruit";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { FAIL_TO_DELETE_RECRUIT, FAIL_TO_UPDATE_RECRUIT, SUCCESS_TO_DELETE_RECRUIT, SUCCESS_TO_UPDATE_RECRUIT } from "@/constants/constants";
import { ToastResult, ToastStyle } from "@/types/toast";

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

  //自分が作成したRecruitを全件取得
  async getMyRecruits(): Promise<Recruit[]> {
    const myRecruits = (
      await axiosInstance.get("/user-recruit/my-recruits").catch((err) => {
        throw new Error(`Recruits is not founded ${err} `);
      })
    ).data;
    return myRecruits;
  },

  //自分が関与している募集の一覧取得
  async getMyRelatedRecruits(): Promise<Recruit[]> {
    const recruits = (
      await axiosInstance.get("/user-recruit/related-recruits").catch((err) => {
        throw new Error(`recruits is not found | ${err}`);
      })
    ).data;
    return recruits;
  },

  //あるユーザーが作成したRecruitを全件取得
  async getRecruitsByUserId(userId: string): Promise<Recruit[]> {
    const myRecruits = (
      await axiosInstance
        .get(`/user-recruit/owned-recruits-by-id/${userId}`)
        .catch((err) => {
          throw new Error(`Recruits is not founded ${err} `);
        })
    ).data;
    return myRecruits;
  },

  //あるユーザーが関与している募集の一覧取得
  async getRelatedRecruitsByUserId(userId: string): Promise<Recruit[]> {
    const recruits = (
      await axiosInstance
        .get(`/user-recruit/related-recruits-by-id/${userId}`)
        .catch((err) => {
          throw new Error(`recruits is not found | ${err}`);
        })
    ).data;
    return recruits;
  },

  //特定のuidを持つ募集の取得
  async getRecruitById(recruitId: string): Promise<Recruit> {
    const recruit = (
      await axiosInstance
        .get(`/user-recruit/findOne/${recruitId}`)
        .catch((err) => {
          throw new Error(`recruit is not by Id | error: ${err}`);
        })
    ).data;
    return recruit;
  },

  //ユーザーに関連するRecruitを全件取得
  async getRelatedRecruits(): Promise<Recruit[]> {
    const relatedRecruits = (
      await axiosInstance.get("/user-recruit/related-recruits").catch((err) => {
        throw new Error(`Recruits is not founded ${err} `);
      })
    ).data;

    return relatedRecruits;
  },

  //いいねしたRecruitを全件取得
  async getLikedRecruits(): Promise<Recruit[]> {
    const likedRecruits = ( await axiosInstance.get('/user-recruit/liked-recruits').catch((error) => {
      throw new Error('取得に失敗しました。')
    })).data

    return likedRecruits
  },

  //募集の作成
  async createRecruit(
    recruitData: FormRecruitData,
    userId?: string
  ): Promise<{message: string, style: ToastStyle}> {
    try {
      await axiosInstance.post("/user-recruit", recruitData);
      return { message: "募集作成に成功しました。", style: 'success' };
    } catch (error) {
      return { message: "募集作成に失敗しました。", style: 'failed' };
    }
  },

  //募集情報の編集
  async editRecruit(
    { id, input }: {id: string, input: FormRecruitData},
  ): Promise<ToastResult> {
    try {
      await axiosInstance.put(`/user-recruit/${id}`, input);
      return {
        style: 'success',
        message: SUCCESS_TO_UPDATE_RECRUIT
      }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_UPDATE_RECRUIT} ${isTypeSafeError ? error.message : ""}`
      }
    }
  },

  //募集の削除
  async deleteRecruit(id: string): Promise<ToastResult> {
    try {
      await axiosInstance.delete(`/user-recruit/${id}`)
      return {
        style: 'success',
        message: SUCCESS_TO_DELETE_RECRUIT
      }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error
      return {
        style: 'failed',
        message: `${FAIL_TO_DELETE_RECRUIT}\n${isTypeSafeError ? error.message : ""}`
      }
    }
  }


};
