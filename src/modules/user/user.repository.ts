import axios from "axios";
import { User } from "../../types/user";
import { axiosInstance } from "@/libs/axios";

export const UserRepository = {
  //全件取得
  async findAll(): Promise<User[]> {
    const users = (await axiosInstance.get('/user').catch((err) => {
      throw new Error(`users not found err:${err}`)
    })).data

    return users
  },

  //一意のユーザーを取得
  async findUserByFirebaseUID(): Promise<User> {
    console.log(`settoken${axiosInstance.defaults.headers.common["Authorization"]}`)
    const user = ( await axiosInstance.get('/user/find-by-firebase-uid').catch((err) => {
      throw new Error(`user not found | error: ${err}`)
    })).data
    return user
  },

  //認証を利用せずにparamでユーザーを取得
  async findByFirebaseUIDWithoutFirebaseAuth(id: string):Promise<User> {
    const user =  (await axios.get(`localhost:8080/${id}`).catch((err) => {
      throw new Error(`user not found | error: ${err}`)
    })).data
    return user
  },
  //更新
  async updateUserInfo(submitDate: any): Promise<User> {
    const user = ( await axiosInstance.put('/user/update-by-firebase-uid', submitDate).catch((err) => {
      throw new Error(`user not update | ${err}`)
    })).data
    return user
  }
};
