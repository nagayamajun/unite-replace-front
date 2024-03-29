import { axiosInstance } from "@/libs/axios";
import { ReactNode, useEffect, useState } from "react";
import { Loading } from "../../organisms/Loading/Loading";
import { Header } from "../Header/Header";
import { NavigationBar } from "../Navigation/NavigationBar";
import { useAuth } from "@/application/usecases/authWithRequire";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {;
  // BUGFIX: ここでrecoilのLoadingを使うとハイドレーションエラーになる。
  // 理由？ ここでは初期がtrueなのでLoading -> 表示になっているがrecoilを使った場合false -> true -> falseの流れになってしまう為。
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <Loading />;
  if (!user) return <></>;
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
