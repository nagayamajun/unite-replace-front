import { Recruit } from "@/domein/recruit";
import { RecruitInfo } from "@/ui/recruit/detail/RecruitInfo";
import { UserInfo } from "@/ui/recruit/detail/UserInfo";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { getRecruitById } from "@/application/usecases/getRecruit";
import { UserLayoutWithoutAuth } from "@/components/layouts/Layout/UserLayoutWithoutAuth";
import { useGlobalUser } from "@/adapters/globalState.adapter";
import { RecruitApplicationButtons } from "@/ui/recruit/detail/RecruitApplicationButtons";
import { SendToLogInButton } from "@/ui/recruit/detail/SendToLogInButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { getRecruit } = getRecruitById(); 

  try {
    const { recruit } = await getRecruit(id as string);
    return {
      props: { recruit }
    };
  } catch (error) {
    return { notFound: true };
  }
}

type Props = {
  recruit: Recruit
}

const RecruitDetailPage = ({ recruit }: Props) => {
  const { user } = useGlobalUser();

  return (
    <div className="flex flex-col items-center w-base text-sm space-y-14 mb-8">
      <RecruitInfo recruit={recruit} />
      <UserInfo user={recruit.recruiter!}/>

      { user !== null ? 
        (
          <RecruitApplicationButtons 
            recruit={recruit}
          />
        ) : (
          <SendToLogInButton />
        )
      }
    </div>
  )
 }

 RecruitDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayoutWithoutAuth>{page}</UserLayoutWithoutAuth>
}
export default RecruitDetailPage

