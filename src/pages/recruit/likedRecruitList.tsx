import { UserLayout } from "@/components/templetes/layouts/UserLayout"
import { LikedRecruitList } from "@/components/templetes/user/LikedRecruitList";
import { ReactElement } from "react"

const LikedRecruitListPage = () => (
  <LikedRecruitList />
)

LikedRecruitListPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>


export default LikedRecruitListPage