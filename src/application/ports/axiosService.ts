
export interface AxiosService {
  setAuthToken: (token: string) => void;
  clearAuthToken: () => void;
};