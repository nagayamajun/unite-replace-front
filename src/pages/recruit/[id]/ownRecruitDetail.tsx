import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { OwnRecruitDetail } from "@/features/recruit/components/templates/OwnRecruitDetail";
import { ReactElement } from "react";


const OwnRecruitDetailPage = () => <OwnRecruitDetail />

OwnRecruitDetailPage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default OwnRecruitDetailPage
