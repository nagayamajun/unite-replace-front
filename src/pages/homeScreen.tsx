import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { HomeScreen } from "@/components/templetes/user/HomeScreen";
import { filteredRecruitAtomState } from "@/global-states/filteredRecruits";
import { recruitAtomState } from "@/global-states/recruitAtom";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { NextPageWithLayout } from "./_app";

export const getStaticProps: GetStaticProps = async () => {
  const recruitsArray = await recruitRepository.getRecruits();

  return {
    props: {
      recruitsArray,
    },
  };
};

type Props = {
  recruitsArray: InferGetStaticPropsType<typeof getStaticProps>["recruits"];
};

const HomeScreenPage = ({ recruitsArray }: Props) => {
  const setRecruits = useSetRecoilState(recruitAtomState);
  const setFilteredRecruits = useSetRecoilState(filteredRecruitAtomState);

  //しなくても良い？
  useEffect(() => {
    setRecruits(recruitsArray);
    setFilteredRecruits(recruitsArray);
  }, [recruitsArray]);

  return <HomeScreen />;
};

HomeScreenPage.getLayout = (page: ReactElement) => (
  <UserLayout> {page} </UserLayout>
);
export default HomeScreenPage;

//パスを変える
//queryパラメータで変える
// 動的ルーティング
