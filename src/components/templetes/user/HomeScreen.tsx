import { Header } from "@/components/organisms/Header";
import { NarrowSearch } from "@/components/organisms/NarrowSerch";
import { useAuth } from "@/hooks/useAuth";
import { ReactElement, useEffect, useState } from "react";
import { RecruitList } from "../../organisms/RecruitList";
import { UploadProductModal } from "../../organisms/UploadProductModal";
import { Loading } from "../common/Loading";
import { UserLayout } from "../layouts/UserLayout";

export const HomeScreen = () => {
  const user = useAuth();
  const [uid, setUid] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUid(user?.firebaseUID);
  }, [user?.firebaseUID]);

  if (!uid) return <Loading />;


  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <NarrowSearch />
      <div className="border-b w-full p-1"></div>
      <RecruitList />

      {/* <div className="py-6 sm:py-8 lg:py-12 ">
        <div className="mx-auto px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-4 mx-20">
            <h3 className=" font-zen font-regular text-1xl lg:text-3xl">
              募集一覧
            </h3>
            <div className="flex items-center">
              <NewOrder />
            </div>
          </div>
          <RecruitList />
        </div>
      </div>
      <AddCardButton />
      <div className="justify-center flex mt-10">
        <button
          className="bg-green-50 p-4 rounded-md"
          onClick={authRepository.logOut}
        >
          ログアウト
        </button>
      </div> */}


      <UploadProductModal
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

HomeScreen.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

