import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

//apiリクエストを投げる際にヘッダーにトークンを追加する
export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"]
};
