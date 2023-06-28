import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { RecruitDetail } from "@/components/templetes/user/RecruitDetail";
import { ReactElement } from "react";


const RecruitDetailPage = () => {
  return (
    <>
      <RecruitDetail />
    </>
  )
 }

 RecruitDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

 export default RecruitDetailPage

