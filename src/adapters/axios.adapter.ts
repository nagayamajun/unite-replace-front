import { AxiosService } from "@/application/ports/axiosService";
import { axiosService } from "@/infrastructures/frameworks/axios";

export const useAxios = (): AxiosService => {
  return {
    setAuthToken(token) {
        return axiosService.setAuthToken(token);
    },
    clearAuthToken() {
        return axiosService.clearAuthToken();
    },
  }
}