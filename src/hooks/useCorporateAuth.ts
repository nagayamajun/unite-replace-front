import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
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
  const [corporation, setCorporation] = useRecoilState<CorporationStateType>(CorporationState);

  //apiは作成している
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (authCorporation) => {
  //     if (authCorporation) {
  //       // const token = await authCorporation.getIdToken();
  //       // setAuthToken(token);
  //       // const employee = await employeeRepository.findEmployeeByFirebaseUID()

  //       // if (employee) {
  //       //   setCorporation(employee)
  //       // }
  //       //
  //     } else {
  //       // resetStatus();
  //       //Authコンポーネントにpush
  //       router.push('/corporation/corporateSignIn');
  //     }
  //   });
  //   return () => unsub();
  // }, []);

  // return corporation;
};
