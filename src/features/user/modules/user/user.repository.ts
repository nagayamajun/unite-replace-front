import axios from "axios";
import { User } from "../../types/user";
import { axiosInstance } from "@/libs/axios";
import {
  FAIL_TO_UPDATE_USER,
  SUCCESS_IN_UPDATE_USER,
} from "@/constants/constants";
import { ConfirmModal } from "@/types/confirmModal";
import { ToastResult } from "@/types/toast";

export const UserRepository = {
  //全件取得
  async findAll(): Promise<User[]> {
    const users = (
      await axiosInstance.get("/user").catch((err) => {
        throw new Error(`users not found err:${err}`);
      })
    ).data;

    return users;
  },

  //一意のユーザーをuserIdで取得
  async findUserById(userId: string): Promise<User> {
    const user = (
      await axiosInstance.get(`/user/find-by-id/${userId}`).catch((err) => {
        throw new Error(`user not found | error: ${err}`);
      })
    ).data;
    return user;
  },

  //一意のユーザーをfirebaseUidで取得
  async findUserByFirebaseUID(): Promise<User> {
    const user = (
      await axiosInstance.get("/user/find-by-firebase-uid").catch((err) => {
        throw new Error(`user not found | error: ${err}`);
      })
    ).data;
    return user;
  },

  //認証を利用せずにparamでユーザーを取得
  async findByFirebaseUIDWithoutFirebaseAuth(
    firebaseUID: string
  ): Promise<User> {
    const user = (
      await axios
        .get(`http://localhost:8080/user/${firebaseUID}`)
        .catch((err) => {
          throw new Error(`user not found | error: ${err}`);
        })
    ).data;
    return user;
  },

  //更新
  async updateUserInfo(
    submitData: any
  ): Promise<ToastResult<User>> {
    try {
      const user = (
        await axiosInstance.put("/user/update-by-firebase-uid", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;

      return { data: user, style: 'success', message: SUCCESS_IN_UPDATE_USER };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return { 
        style: 'failed',
        message: `${FAIL_TO_UPDATE_USER}\n${isTypeSafeError && error.message}` 
      };
    }
  },
};
