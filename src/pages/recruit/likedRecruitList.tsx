import { useRecruitByOwnLiked } from "@/application/usecases/getRecruitsByOwnLiked";
import { H2Title } from "@/components/Title/H2Title";
import { UserLayout } from "@/components/layouts/Layout/UserLayout"
import { RecruitList } from "@/ui/recruit/shared-components/recruitList";
import { ReactElement } from "react"

const LikedRecruitListPage = () => {
  const { recruits } = useRecruitByOwnLiked();

  return (
    <div className="flex flex-col w-card-list text-sm space-y-14 mb-8">
      <div className="mx-auto md:mx-0 mt-20">
        <H2Title title='いいね一覧' />
      </div>
      <RecruitList
        recruits={recruits}      
      />
    </div>
  )
}

LikedRecruitListPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>


export default LikedRecruitListPage