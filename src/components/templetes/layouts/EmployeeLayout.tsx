import { ReactNode, useEffect, useState } from "react"
import { CorporateSideBar } from "@/components/organisms/CorporateSidebar"
import { useRecoilValue } from "recoil"
import { CorporationState, CorporationStateType } from "@/global-states/corporateAtom"
import { useCorporateAuth } from "@/hooks/useCorporateAuth"
import { axiosInstance } from "@/libs/axios"
import { Loading } from "../common/Loading"


type Props = {
  children: ReactNode
}

export const EmployeeLayout = ({children}: Props) => {
  const employee = useRecoilValue<CorporationStateType>(CorporationState);
  const [isLoading, setIsloading] = useState(true);
  const auth = useCorporateAuth();

  useEffect(() => {
    if (employee && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsloading(false);
    }
  },[auth])
  
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-row w-full">
      <CorporateSideBar />
      <main className="flex-grow bg-gray-50">{ children }</main>
    </div>
  )
}

