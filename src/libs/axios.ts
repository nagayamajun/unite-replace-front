import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

//レスポンスのエラー判定
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('responseのエラー',error);
    switch(error.response.status) {
      case 400:
        console.log("400です")
      case 401:
        //signInPageに遷移
        console.log("401です");
        break;
      case 403: 
        console.log("403です");
        break;
      case 404: 
        console.log("404です");
        break;
      default:
        console.log("internal server error")
    };

    const errorMessage = (error.response?.data.message || "").split(",");
    throw new Error(errorMessage);
  }
)

// 確認してから実装
//リクエスト処理の共通化
// axiosInstance.interceptors.request.use(async (request: any) => {
//   return request
// })

//apiリクエストを投げる際にヘッダーにトークンを追加する
export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
