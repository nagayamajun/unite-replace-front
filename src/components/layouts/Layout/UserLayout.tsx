import { MobileHeader } from "@/components/layouts/Header/MobileHeader";
import { UserState } from "@/stores/atoms";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/libs/axios";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../../organisms/Loading/Loading";
import { SideBar } from "@/components/layouts/Sidebar/UserSidebar";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  const user = useRecoilValue(UserState);
  const [isLoading, setIsloading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsloading(false);
    }
  }, [auth]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="sm:hidden">
        <MobileHeader />
        <main>{children}</main>
      </div>

      <div className="hidden sm:flex sm:flex-row">
        <SideBar />
        <div className="flex-grow bg-gray-100 flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};
