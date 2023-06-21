import { FormRecruitData } from "@/components/templetes/user/AddRecruit";
import { Recruit } from "@/types/recruit";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import axios from "axios";

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
      const userRecruitParticipants = ( await axios.post('http://localhost:8080/user-recruit-participant/find-many-by-userRecruit',  { recruitId } )).data
      return userRecruitParticipants

    } catch (error) {
      throw new Error(`userRecruitparticipantsを取得することができませんでした。${error}`)
    }
  },

  async  approveParticipant(id: string) {
    try {
      await axios.put(`http://localhost:8080/user-recruit-participant/${id}/approve`)
      return{ message: '承認しました。'}
    } catch (error) {
      throw new Error(`承認することができませんでした。${error}`)
    }
  }
};

  // //認証を利用せずにparamでユーザーを取得
  // async findByFirebaseUIDWithoutFirebaseAuth(firebaseUID: string):Promise<User> {
  //   const user =  (await axios.get(`http://localhost:8080/user-recruit-participant/:id/approve`).catch((err) => {
  //     throw new Error(`user not found | error: ${err}`)
  //   })).data
  //   return user
  // },
