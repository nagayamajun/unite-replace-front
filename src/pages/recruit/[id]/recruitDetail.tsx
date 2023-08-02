import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { RecruitDetail } from "@/features/recruit/components/templates/RecruitDetail";
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

