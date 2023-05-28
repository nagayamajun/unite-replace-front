import { Header } from "@/components/organisms/Header";
import { UserState } from "@/global-states/atoms";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/libs/axios";
// import { SuccessModal } from "@/components/organisms/SuccessModal"
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../common/Loading";

type Props = {
  children: ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  const user = useRecoilValue(UserState);
  const [isLoading, setIsloading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setIsloading(true);
    if (user && axiosInstance.defaults.headers.common["Authorization"]) {
      setIsloading(false);
    }
  }, [auth]);

  if (isLoading) return <Loading />;

  return (
    <>
      {/* <SuccessModal /> */}
      <Header />
      <main>{children}</main>
    </>
  );
};
