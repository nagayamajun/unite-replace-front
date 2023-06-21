import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { MyRecruitsAndRelatedRecruits } from "@/components/templetes/user/MyRecruitsAndRelatedRecruits";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { Recruit } from "@/types/recruit";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
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
