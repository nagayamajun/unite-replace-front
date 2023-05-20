import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { RecruitDetail } from "@/components/templetes/user/RecruitDetail";
import { getRecruitById } from "@/modules/recruit/recruit.repository";
import { Recruit } from "@/types/recruit";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";

type Props = {
  recruit: Recruit
}

interface Params extends ParsedUrlQuery {
  id: string
}

 //SSRでサーバー側でデータ取得をする。
 export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { id } = params as Params;
  const recruit = await getRecruitById(id);

  return {
    props: {
      recruit
    }
  }
}

const recruitDetail = ({ recruit }: Props) => {
  return (
    <>
      <RecruitDetail recruit={recruit}/>
    </>
  )
 }

 recruitDetail.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

 export default recruitDetail

