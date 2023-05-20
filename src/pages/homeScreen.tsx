import { HomeScreen } from "@/components/templetes/user/HomeScreen";
import { filteredRecruitAtomState } from "@/global-states/filteredRecruits";
import { recruitAtomState } from "@/global-states/recruitAtom";
import { getRecruits } from "@/modules/recruit/recruit.repository";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { useRecoilState,} from "recoil";

export const getStaticProps: GetStaticProps = async () => {
  const recruitsArray = await getRecruits();

  return {
    props: {
      recruitsArray
    }
  }
};

type Props = {
  recruitsArray: InferGetStaticPropsType <typeof getStaticProps>["recruits"];
}

const homeScreen = ({ recruitsArray }: Props) => {
  const [recruits, setRecruits] = useRecoilState(recruitAtomState);
  const [filteredRecruits, setFilteredRecruits ] = useRecoilState(filteredRecruitAtomState)

  //しなくても良い？
  useEffect(() => {
    setRecruits(recruitsArray);
    setFilteredRecruits(recruitsArray)
  }, [recruitsArray]);

  return (
    <>
     <HomeScreen
     />
    </>
  )
}



export default homeScreen;

//パスを変える
//queryパラメータで変える
// 動的ルーティング
