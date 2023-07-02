import { CorporateHeaderLine } from "@/components/organisms/CorporateHeaderLine";
import { UserList } from "@/components/organisms/UserList";
import { Loading } from "@/components/templetes/common/Loading";
import { useCorporateAuth } from "@/hooks/useCorporateAuth";
import { authRepository } from "@/modules/auth/auth.repository";
import { useEffect, useState } from "react";

const CorporationHome = () => {
  const corporation = useCorporateAuth();
  const [uid, setUid] = useState<string>();

  // useEffect(() => {
  //   setUid(corporation?.uid);
  // }, [corporation?.uid]);

  // if (!uid) return <Loading />;

  return (
    <>
      <CorporateHeaderLine />
      <UserList />
      <div className="justify-center flex mt-10">
        <button
          className="bg-green-50 p-4 rounded-md"
          onClick={authRepository.logOut}
        >
          ログアウト
        </button>
      </div>
    </>
  );
};

export default CorporationHome;
