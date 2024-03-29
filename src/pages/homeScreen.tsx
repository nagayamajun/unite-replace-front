import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import { SearchRecruit } from "@/ui/recruit/searchAndList/SearchRecruit";
import { RecruitList } from "@/ui/recruit/shared-components/recruitList";
import { SearchRecruits } from "@/application/usecases/searchRecruit";
import { Recruit } from "@/domein/recruit";
import { UserLayoutWithoutAuth } from "@/components/layouts/Layout/UserLayoutWithoutAuth";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { search } = context.query;
  const { getSearchRecruits } = SearchRecruits();
  try {
    const { recruits } = await getSearchRecruits(search as string);
    return {
      props: { recruits }
    };
  } catch (error) {
    return { notFound: true };
  }
};

type Props = {
  recruits: Recruit[];
};

const HomeScreenPage = ({ recruits }: Props) => {
  return (
    <div className="flex flex-col w-card-list mb-8">
      <SearchRecruit />
      <RecruitList 
        recruits={recruits}
      />
  </div>
  )
};

// HomeScreenPage.getLayout = (page: ReactElement) => (
//   <UserLayout> {page} </UserLayout>
// );
HomeScreenPage.getLayout = (page: ReactElement) => (
  <UserLayoutWithoutAuth> {page} </UserLayoutWithoutAuth>
);
export default HomeScreenPage;