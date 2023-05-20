import { db } from "@/libs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { User } from "../../types/user";
import { axiosInstance } from "@/libs/axios";

export const UserRepository = {
  async findOneByUid(uid: string): Promise<User> {
    const ref = doc(db, `users/${uid}`);
    const snapShot = await getDoc(ref);
    return snapShot.data() as User;
  },

  async findMany(): Promise<User[]> {
    const querySnapShot = getDocs(collection(db, "users"));
    const users = (await querySnapShot).docs.map((doc) => doc.data() as User);
    return users;
  },

  async find(uid: string | string[] | undefined): Promise<User> {
    const userRef = doc(db, `users/${uid}`);
    const res = await getDoc(userRef);
    const user = res.data() as User;
    return user;
  },

  async update(uid: string, data: User): Promise<void> {
    const ref = doc(db, `users/${uid}`);
    await updateDoc(ref, data);
  },
};


//nest.js
//一意のユーザーを取得する
export const findOneUser = async() => {
  const user = ( await axiosInstance.get('/user/find-by-firebase-uid').catch((err) => {
    throw new Error(`user not found | error: ${err}`)
  })).data
  return user
}
//user情報をアップデートする
export const updateUserInfo = async(submitDate: any) => {
  const user = ( await axiosInstance.put('/user/update-by-firebase-uid', submitDate).catch((err) => {
    throw new Error(`user not update | ${err}`)
  })).data
  return user
}
