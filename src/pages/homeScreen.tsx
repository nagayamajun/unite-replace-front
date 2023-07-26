import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { HomeScreen } from "@/features/recruit/components/templates/HomeScreen";
import { filteredRecruitAtomState } from "@/features/recruit/stores/filteredRecruits";
import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
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
    revalidate: 60
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
