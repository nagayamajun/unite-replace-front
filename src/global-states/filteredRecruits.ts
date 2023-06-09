import { Recruit } from "@/types/recruit";
import { atom } from "recoil";
import { recruitAtomState } from "./recruitAtom";

export const filteredRecruitAtomState = atom<Recruit[]>({
  key: "filteredRecruitAtomState",
  default: [],
});
