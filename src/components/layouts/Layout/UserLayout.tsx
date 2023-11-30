
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/libs/axios";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../../organisms/Loading/Loading";
import { Header } from "../Header/Header";
import { NavigationBar } from "../Navigation/NavigationBar";
import { useGlobalUser } from "@/adapters/globalState.adapter";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {;
  // BUGFIX: ここでrecoilのLoadingを使うとハイドレーションエラーになる。
  // 理由？ ここでは初期がtrueなのでLoading -> 表示になっているがrecoilを使った場合false -> true -> falseの流れになってしまう為。
  const { user } = useGlobalUser();
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsLoading(false);
    }
  }, [auth]);

  if (isLoading) return <Loading />;
  if (!user) return <></>
  return (
    <>
      <Header 
        user={user}
      />
      <NavigationBar />
      <main className="flex justify-center">{children}</main>
    </>
  );
};
