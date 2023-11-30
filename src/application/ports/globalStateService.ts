import { UserStateType } from "@/infrastructures/frameworks/store";
import { Loading } from "@/types/loading";


export interface GlobalUserService {
  user: UserStateType;
  setUser: (user: UserStateType) => void;
};

export interface GlobalLoadingService {
  loading: Loading;
  showLoading: () => void;
  hideLoading: () => void;
};