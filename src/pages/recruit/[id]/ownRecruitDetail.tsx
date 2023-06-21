import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { OwnRecruitDetail } from "@/components/templetes/user/OwnRecruitDetail";
import { ReactElement } from "react";


const OwnRecruitDetailPage = () => {

  return (
    <>
      <OwnRecruitDetail />
    </>
  )
}

OwnRecruitDetailPage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default OwnRecruitDetailPage
