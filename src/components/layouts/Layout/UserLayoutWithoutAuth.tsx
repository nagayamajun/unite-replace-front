import { ReactNode, useEffect, useState } from "react";
import { Loading } from "../../organisms/Loading/Loading";
import { Header } from "../Header/Header";
import { NavigationBar } from "../Navigation/NavigationBar";
import { useAuthWithOutRequire } from "@/application/usecases/authWithOutRequire";

type Props = {
  children: ReactNode;
};

export const UserLayoutWithoutAuth = ({ children }: Props) => {;
  const user = useAuthWithOutRequire();

  // FIX: 理解できていない
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <>
      <Header 
        user={user}
      />
      {
        user !== null && (
          <NavigationBar />
        )
      }
      <main className="flex justify-center">{children}</main>
    </>
  );
};
