import { Loading } from "@/types/loading";
import { atom } from "recoil";

export const LoadingState = atom<Loading>({
  key: "LoadingState",
  default: {
    isLoading: false,
    message: null
  },
});
