import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { useUpdateUserInfo } from "@/application/usecases/updateUserInfo";

export type Option = {
  label: string;
  value: string;
};

export const SkillPage = (): JSX.Element => {

  const router = useRouter();
  const { handleSubmit, control } = useForm();
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  const { updateUserInfo } = useUpdateUserInfo();

  //enum型からスキルオブジェクト作成
  const options = Object.values(ProgrammingSkill).map((skill) => ({
    value: skill,
    label: skill,
  }));

  const onSubmit = async (submitData: any) => { 
    const isSuccess = await updateUserInfo(submitData);
    if (isSuccess) router.push("/profiles/user/githubInfo");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center px-80 h-screen text-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col gap-12 w-base"
      >
        <Controller
          name="programingSkills"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={options}
              onChange={(selectedSkills) => {
                setSelectedSkills(selectedSkills as Option[]);
                field.onChange(selectedSkills.map((skill) => skill.value));
              }}
              placeholder="スキル名を選択してください (複数選択可)"
            />
          )}
        />
        <div className="flex flex-wrap gap-4">
          {selectedSkills.map((selectedSkill) => (
            <div
              key={selectedSkill.label}
              className="px-8 py-2 rounded-3xl bg-green-400 text-white text-base"
            >
              {selectedSkill.value ?? " "}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-24">
          <SubmitButton innerText="次へ" />
        </div>
      </form>
    </div>
  );
};

export default SkillPage;