import { User } from "@/domein/user";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type UserStateType = User | null;

export const { persistAtom } = recoilPersist({ key: "UserState" });

export const UserState = atom<UserStateType>({
  key: "UserState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
