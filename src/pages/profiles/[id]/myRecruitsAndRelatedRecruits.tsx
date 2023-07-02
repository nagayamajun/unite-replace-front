import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { MyRecruitsAndRelatedRecruits } from "@/components/templetes/user/MyRecruitsAndRelatedRecruits";
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
