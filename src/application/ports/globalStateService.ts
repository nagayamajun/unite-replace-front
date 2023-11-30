import { UserStateType } from "@/infrastructures/frameworks/store";


export interface GlobalUserService {
  user: UserStateType;
  setUser: (user: UserStateType) => void;
};

export interface GlobalLoadingService {
  showLoading: () => void;
  hideLoading: () => void;
};