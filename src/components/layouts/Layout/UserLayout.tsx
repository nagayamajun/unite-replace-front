import { MobileHeader } from "@/components/layouts/Header/MobileHeader";
import { UserState } from "@/stores/atoms";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/libs/axios";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../../organisms/Loading/Loading";
import { SideBar } from "@/components/layouts/Sidebar/UserSidebar";
import { useLoading } from "@/hooks/useLoading";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  const { showLoading, hideLoading } = useLoading();
  const user = useRecoilValue(UserState);
  const auth = useAuth();

  useEffect(() => {
    showLoading();
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      hideLoading();
    }
  }, [auth]);

  return (
    <>
      <div className="sm:hidden">
        <MobileHeader />
        <main>{children}</main>
      </div>

      <div className="hidden sm:flex sm:flex-row">
        <SideBar />
        <div className="flex flex-grow w-auto bg-gray-50 ">{children}</div>
      </div>
    </>
  );
};
