import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "../features/user/types/user";
export type UserStateType = User | null;

export const { persistAtom } = recoilPersist({ key: "UserState" });

export const UserState = atom<UserStateType>({
  key: "UserState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
