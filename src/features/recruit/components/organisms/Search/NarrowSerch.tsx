import { filteredRecruitAtomState } from "@/features/recruit/stores/filteredRecruits";
import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import { ProgramingSkill } from "@/features/user/types/programingSkill";
import { Recruit } from "@/features/recruit/types/recruit";
import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue } from "recoil";
import { PlainInput } from "../../../../../components/molecules/Input/PlainInput";
import { SkillSelect } from "../../../../user/components/molecules/Select/SkillSelect";
import { SubmitButton } from "../../../../../components/molecules/Button/SubmitButton";

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
        return recruit.hackthonName?.includes(name) && recruit.programingSkills?.some((skill) => skills?.includes(skill));
      } else if(name || skills?.length! > 0) {
        return (name && recruit.hackthonName?.includes(name)) || (skills && recruit.programingSkills?.some((skill) => skills.includes(skill)));
      } else {
        return recruits
      }
    });
    setFilteredRecruits([...alterRecruitList]);
    alterRecruitList = [];
  };

  return (
    <div className="bg-white pt-5 px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-3/4">
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
    </div>
  )
}
