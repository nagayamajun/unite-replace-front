import { db } from "@/libs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Corporation } from "../../types/corporation";
import { axiosInstance } from "@/libs/axios";

export const CorporationRepositry = {
  async findOneByUid(uid: string): Promise<Corporation> {
    const ref = doc(db, `corporations/${uid}`);
    const snapShot = await getDoc(ref);
    return snapShot.data() as Corporation;
  },

  async update(uid: string, data: Corporation): Promise<void> {
    const ref = doc(db, `corporations/${uid}`);
    await updateDoc(ref, data);
  },
}

//Next
//新規登録
export const createCorporation = async (corporationData: any): Promise<{ message: string; success: boolean}> => {
  try {
    const req = (await axiosInstance.post('corporation', corporationData));
    return {message: "企業作成に成功しました。", success: true}
  } catch(err) {
    return {message: "企業作成に失敗しました。", success: false}
  }
}
