import { filteredRecruitAtomState } from "@/global-states/filteredRecruits";
import { recruitAtomState } from "@/global-states/recruitAtom";
import { ProgramingSkill } from "@/types/programingSkill";
import { Recruit } from "@/types/recruit";
import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from "recoil";
import { PlainInput } from "../atoms/PlainInput";
import { SkillSelect } from "../atoms/SkillSelect";
import { SubmitButton } from "../atoms/SubmitButton";

type FiltteringData = {
  hackthonName?: string;
  programingSkills?: ProgramingSkill[]
}

export const NarrowSearch = () => {

  const { handleSubmit, register, formState: {errors}, control } = useForm();
  const recruits = useRecoilValue(recruitAtomState);
  const [filteredRecruits, setFilteredRecruits] = useRecoilState(filteredRecruitAtomState);

  const onSubmit = ({hackthonName, programingSkills}: FiltteringData) => {
    filterRecruit(hackthonName, programingSkills)
  }

  //条件でフィルターをかける関数
  const filterRecruit = (name?: string, skills?: ProgramingSkill[]) => {
    let alterRecruitList = recruits.filter((recruit) => {
      if(name && skills?.length! > 0) {
        console.log("両方あります")
        return recruit.hackthonName?.includes(name) && recruit.programingSkills?.some((skill) => skills?.includes(skill));
      } else if(name || skills?.length! > 0) {
        return (name && recruit.hackthonName?.includes(name)) || (skills && recruit.programingSkills?.some((skill) => skills.includes(skill)));
      } else {
        console.log("両方ありません🙇‍♀️")
        return recruits
      }
    });

    setFilteredRecruits([...alterRecruitList]);
    alterRecruitList = [];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-14 mt-4 sm:ml-20 sm:mt-10 sm:w-3/5 ">
      <div>
        <p className=" sm:text-2xl text-gray-600 mb-1">条件検索</p>
        <PlainInput
          labelText="ハッカソン名"
          inputType="search"
          placeholder="ハッカソン名で検索できます"
          register={register}
          registerLabel="hackthonName"
          errors={errors}
        />
        <SkillSelect
          registerLabel="programingSkills"
          labelText="スキル"
          placepholder="スキルを選択してください(複数選択可)"
          control={control}
          errors={errors}
        />
      </div>
      <SubmitButton
        innerText="絞り込み"
      />
    </form>
  )
}
