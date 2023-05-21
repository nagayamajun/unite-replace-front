import { FormRecruitData } from "@/components/templetes/user/AddRecruit";
import { UserStateType } from "@/global-states/atoms";
import { db } from "@/libs/firebase";
import { Recruit } from "@/types/recruit";
import axios from "axios";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { recruitCard } from "../../types/recruitCard";
import { axiosInstance } from "@/libs/axios";

export const recruitRepository = {
  //募集の一覧取得
  async getRecruitList(): Promise<recruitCard[]> {
    const collectionRef = collection(db, "recruits");
    const snapshot = await getDocs(collectionRef);
    const recruits = snapshot.docs.map((doc) => doc.data() as recruitCard);
    return recruits;
  },

  //特定のuidを持つ募集の取得
  async findManyByUid(uid: string): Promise<any> {
    const collectionRef = collection(db, "recruits");
    const q = query(collectionRef, where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    const recruits = querySnapshot.docs.map((doc) => {
      return { data: doc.data() as recruitCard, id: doc.id };
    });
    return recruits;
  },

  //募集の作成
  async createRecruitment(data: recruitCard): Promise<void> {
    const collectionRef = collection(db, "recruits");
    await addDoc(collectionRef, data);
  },

  //募集の削除
  async delete(recruitId: string): Promise<void> {
    await deleteDoc(doc(db, `recruits/${recruitId}`)).catch((err) => {
      throw new Error(err);
    });
  },
};

//Nest.js
//募集の一覧取得
export const getRecruits = async (): Promise<Recruit[]> => {
  const recruits = (await axiosInstance.get('/user-recruit').catch((err) => {
    throw new Error(`recruits is not found | ${err}`)
  })).data();
  return recruits;
}

//特定の募集を取得
export const getRecruitById = async (recruitId: string): Promise<Recruit> => {
  const recruit = (await axiosInstance.get(`/user-recruit/${recruitId}`).catch((err) => {
    throw new Error(`recruit is not by Id | error: ${err}`)
  })).data

  return recruit
}
//募集作成
export const createRecuit = async (recruitData: FormRecruitData, userId: any): Promise<{ message: string; success: boolean; }> => {

  try {
    //userIdはstring型？
    const req = (await axiosInstance.post('/user-recruit', recruitData));
    console.log(req)
    return {message: "募集作成に成功しました。", success: true}
  } catch(error) {
    return {message: "募集作成に失敗しました。", success: false}
  }
}

// export const createRecuit = async (recruitData: FormRecruitData, userId: any): Promise<{ message: string; success: boolean; }> => {
//   try {
//     //userIdはstring型？
//     const res = await axios.post("http://localhost:8080/recruit/user-recruit", recruitData, {
//       //最終的にはサーバーサイドのcontextから取得できるようにする・
//       headers: { "recruiter-id":  userId}
//     })
//     return {message: "募集作成に成功しました。", success: true}
//   } catch(error) {
//     return {message: "募集作成に失敗しました。", success: false}
//   }
// }
