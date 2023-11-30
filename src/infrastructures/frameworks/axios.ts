import { axiosInstance } from "@/libs/axios";

export const axiosService = ({
  setAuthToken: (token: string) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  clearAuthToken: () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
});
