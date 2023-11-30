import { User } from "@/domein/user";
import { Loading } from "@/types/loading";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

// user-state
export type UserStateType = User | null;
const { persistAtom } = recoilPersist({ key: "UserState" });
const UserState = atom<UserStateType>({
  key: "UserState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useRecoilUser = () => {
  const [state, setState] = useRecoilState<UserStateType>(UserState);
  const user = state;
  const setUser = (user: UserStateType) => setState(user);

  return { user, setUser };
};

// loading-state
const LoadingState = atom<Loading>({
  key: "LoadingState",
  default: {
    isLoading: false,
    message: null
  },
});

export const useRecoilLoading = () => {
  const [state, setState] = useRecoilState<Loading>(LoadingState);
  const showLoading = (): void => {
    setState({ ...state, ...{ isLoading: true } });
  };
  const hideLoading = (): void => {
    setState({ ...state, ...{ isLoading: false } });
  };
  return { showLoading, hideLoading };
};