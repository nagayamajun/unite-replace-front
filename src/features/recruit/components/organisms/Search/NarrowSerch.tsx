import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil";
import { PlainInput } from "../../../../../components/molecules/Input/PlainInput";
import { SkillSelect } from "../../../../user/components/molecules/Select/SkillSelect";
import { SubmitButton } from "../../../../../components/molecules/Button/SubmitButton";
import { useRouter } from "next/router";

type FiltteringData = {
  hackthonName?: string;
  programingSkills?: ProgrammingSkill[]
}

export const NarrowSearch = () => {


  const router = useRouter();
  const { handleSubmit, register, formState: {errors}, control } = useForm();
  const recruits = useRecoilValue(recruitAtomState);
  
  const onSubmit = ({hackthonName, programingSkills}: FiltteringData) => {
    filterRecruit(hackthonName, programingSkills)
  }

  //条件でフィルターをかける関数
  const filterRecruit = (name?: string, skills?: ProgrammingSkill[]) => {
    switch (true) {
      case name && skills?.length! > 0:
        router.push({
          pathname: '/homeScreen',
          query: {
            name: name,
            skills: skills,
          },
        });
        break;
      case !!name:
        router.push({
          pathname: '/homeScreen',
          query: {
            name: name,
          },
        });
        break;
      case skills?.length! > 0:
        router.push({
          pathname: '/homeScreen',
          query: {
            skills: skills,
          },
        });
        break;
      default:
        router.push('/homeScreen');
        break;
    }
  };

  return (
    <div className="bg-white pt-5 px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-3/4 md:w-3/5">
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
