import { Recruit } from "@/features/recruit/types/recruit";
import { atom } from "recoil";

export const recruitAtomState = atom<Recruit[]>({
  key: "recruitAtomState",
  default: [],
});
