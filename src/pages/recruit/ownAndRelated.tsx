import { useGetMyAndRelatedRecruits } from "@/application/usecases/getMyAndRelatedRecruits";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { ReturnToHomeButton } from "@/components/molecules/Button/ReturnToHomeButton";
import { MyRecruitsList } from "@/ui/recruit/own-and-related/MyRecruitsList";
import { RelatedRecruitsList } from "@/ui/recruit/own-and-related/RelatedRecruitsList";
import { ReactElement } from "react";


const MyRecruitsAndRelatedRecruitsPage = () => {
  const { myRecruits, relatedRecruits } = useGetMyAndRelatedRecruits();
  return (
    <div className="flex flex-col items-center h-screen w-base space-y-8">
      {/* 自分で作成した募集 */}
      <MyRecruitsList
        myRecruits={myRecruits}
      />

      {/* 自分に関連する募集 */}
      <RelatedRecruitsList 
        relatedRecruits={relatedRecruits}
      />
      <ReturnToHomeButton />
    </div>
  )
}

MyRecruitsAndRelatedRecruitsPage.getLayout = (page: ReactElement) => {
  return <UserLayout> {page}  </UserLayout>
}

export default MyRecruitsAndRelatedRecruitsPage;
