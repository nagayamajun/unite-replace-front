import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { MyRecruitsAndRelatedRecruits } from "@/features/recruit/components/templates/MyRecruitsAndRelatedRecruits";
import { ReactElement } from "react";


const MyRecruitsAndRelatedRecruitsPage = () => {
  return (
    <>
      <MyRecruitsAndRelatedRecruits />
    </>
  )
}

MyRecruitsAndRelatedRecruitsPage.getLayout = (page: ReactElement) => {
  return <UserLayout> {page}  </UserLayout>
}

export default MyRecruitsAndRelatedRecruitsPage;
