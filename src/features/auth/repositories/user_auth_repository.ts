import { axiosInstance } from "@/libs/axios";
import { AuthWithEmailAndPassword, Token } from "../types/auth";

//repositoryの型
export type UserAuthRepository = {
  signUpWithEmailAndPassword: (params: AuthWithEmailAndPassword) => Promise<Token>
  signInWithGoogle: () => Promise<any>
  signInWithGithub: (githubAccount: any) => Promise<any>
}

// emailとpasswordを用いたサインアップ
const signUpWithEmailAndPassword: UserAuthRepository['signUpWithEmailAndPassword'] = async({email, password}: AuthWithEmailAndPassword) => {
  const response = await axiosInstance.post("/user", { email, password });
  const customToken = {
    token: response.data.token
  }
  return customToken;
}

// googleを用いた認証
const signInWithGoogle: UserAuthRepository['signInWithGoogle'] = async() => {
  const response = await axiosInstance.post("/user/sign-in-with-google-or-github");
  // TODO: responseのdataの型を定義する
  return response.data;
}

// githubを用いた認証
const signInWithGithub: UserAuthRepository['signInWithGithub'] =async (githubAccount: any) => {
  const response = await axiosInstance.post('/user/sign-in-with-google-or-github', {
    githubAccount: githubAccount,
  })
  return response.data;
}



// 一つにまとめる
export const userAuthRepository = {
  signUpWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub
}