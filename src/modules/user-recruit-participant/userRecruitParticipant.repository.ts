import { axiosInstance } from "@/libs/axios";

export const userRecruitParticipantRepository = {
  //参加依頼を送る
  async applyForJoin(userRecruitId: string) {
    try {
      await axiosInstance.post("/user-recruit-participant/applyForJoin", { userRecruitId });
      return { message: "募集主に申請しました。", success: true };
    } catch (error) {
      return { message: "募集主への申請に失敗しました。", success: false };
    }
  },

  //一件のuserRecruitに紐ずくuserRecruitPArticipantレコードを全件取得
  async findManyByUserRecruitId(recruitId: string) {
    try {
      const userRecruitParticipants = ( await axiosInstance.post('/user-recruit-participant/find-many-by-userRecruit', { recruitId })).data
      return userRecruitParticipants

    } catch (error) {
      throw new Error(`userRecruitparticipantsを取得することができませんでした。${error}`)
    }
  },

  async  approveParticipant(id: string) {
    try {
      await axiosInstance.put(`/user-recruit-participant/${id}/approve`)
      return{ message: '承認しました。'}
    } catch (error) {
      throw new Error(`承認することができませんでした。${error}`)
    }
  }
};
