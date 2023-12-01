import { ReactNode, useEffect } from "react"
import { CorporateSideBar } from "@/components/layouts/Sidebar/CorporateSidebar"
import { useRecoilValue } from "recoil"
import { useCorporateAuth } from "@/hooks/useCorporateAuth"
import { axiosInstance } from "@/libs/axios"
import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom"
import { useGlobalLoading } from "@/adapters/globalState.adapter"


type Props = {
  children: ReactNode
}

export const EmployeeLayout = ({children}: Props) => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const employee = useRecoilValue<EmployeeStateType>(EmployeeState);
  const auth = useCorporateAuth();

  useEffect(() => {
    showLoading();
    if (employee && axiosInstance.defaults.headers.common["Authorization"]) {
      hideLoading();
    }
  },[auth])

  return (
    <div className="flex flex-row w-full">
      <CorporateSideBar />
      <main className="flex-grow bg-gray-50">{ children }</main>
    </div>
  )
}

