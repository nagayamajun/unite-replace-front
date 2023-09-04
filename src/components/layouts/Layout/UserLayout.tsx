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

export const UserLayout = ({ children }: Props) => {;
  // BUGFIX: ここでrecoilのLoadingを使うとハイドレーションエラーになる。
  // 理由？ ここでは初期がtrueなのでLoading -> 表示になっているがrecoilを使った場合false -> true -> falseの流れになってしまう為。
  const user = useRecoilValue(UserState);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsLoading(false);
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
        <div className="flex flex-grow w-auto bg-gray-50 ">{children}</div>
      </div>
    </>
  );
};
