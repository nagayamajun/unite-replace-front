import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

//apiリクエストをするときのデフォルトのauthorizationヘッダーを設定
export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// デフォルトのauthorizationヘッダーを削除
export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
