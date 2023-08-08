import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { HomeScreen } from "@/features/recruit/components/templates/HomeScreen";
import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement, useEffect } from "react";
import { useSetRecoilState } from "recoil";

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

  //しなくても良い？
  useEffect(() => {
    setRecruits(recruitsArray);
  }, [recruitsArray]);

  return <HomeScreen />;
};

HomeScreenPage.getLayout = (page: ReactElement) => (
  <UserLayout> {page} </UserLayout>
);
export default HomeScreenPage;