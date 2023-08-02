import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { corporateAuth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { setAuthToken } from "@/libs/axios";
import { employeeRepository } from "@/features/auth/modules/employee/employee.repository";
import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom";


export const useCorporateAuth = () => {
  const router = useRouter();
  const [employee, setEmployee] = useRecoilState<EmployeeStateType>(EmployeeState);

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
