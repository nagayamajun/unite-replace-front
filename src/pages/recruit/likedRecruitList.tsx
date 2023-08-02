import { UserLayout } from "@/components/layouts/Layout/UserLayout"
import { LikedRecruitList } from "@/features/recruit/components/templates/LikedRecruitList";
import { ReactElement } from "react"

const LikedRecruitListPage = () => (
  <LikedRecruitList />
)

LikedRecruitListPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>


export default LikedRecruitListPage