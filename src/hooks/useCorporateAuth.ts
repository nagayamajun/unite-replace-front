import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth, corporateAuth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/global-states/atoms";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { User } from "../types/user";
import { CorporationState, CorporationStateType } from "@/global-states/corporateAtom";
import { Corporation } from "../types/corporation";
import { setAuthToken } from "@/libs/axios";
import { CorporationRepositry } from "@/modules/corporation/corporation.repository";
import { employeeRepository } from "@/modules/employee/employee.repository";


export const useCorporateAuth = () => {
  const router = useRouter();
  const [employee, setEmployee] = useRecoilState<CorporationStateType>(CorporationState);

  useEffect(() => {
    const unsub = onAuthStateChanged(corporateAuth, async (authEmployee) => {
      if (authEmployee) {
        const token = await authEmployee.getIdToken();
        setAuthToken(token);

        const employee = await employeeRepository.getEmployeeByFirebaseUID();
        if(employee) {
          setEmployee(employee)
        }
      } else {
        router.push("/corporation/corporateSignIn")
      }
    })
    return () => unsub();

  }, [])

  return employee
};
