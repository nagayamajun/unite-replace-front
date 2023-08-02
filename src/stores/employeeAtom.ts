import { Employee } from "@/features/auth/types/employee";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


export type EmployeeStateType = Employee | null;

const { persistAtom } = recoilPersist({ key: "EmployeeState" })

export const EmployeeState = atom<EmployeeStateType>({
  key: "EmployeeState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});


