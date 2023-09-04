import { UserState } from "@/stores/atoms";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../../../components/molecules/Button/SubmitButton";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { ToastResult } from "@/types/toast";
import { useToast } from "@/hooks/useToast";

export type Option = {
  label: string;
  value: string;
};

export const SkillPage = (): JSX.Element => {
  const { handleSubmit, control } = useForm();
  const [userState, setUserState] = useRecoilState(UserState);
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const { showToast, hideToast } = useToast();

  //enum型からスキルオブジェクト作成
  const options = Object.values(ProgrammingSkill).map((skill) => ({
    value: skill,
    label: skill,
  }));

  const onSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({ ...userState, ...submitData }).then(
      ({message, style}: ToastResult) => {
        setUserState({ ...userState, ...submitData });

        showToast({message, style})
        setTimeout(
          () => {
            hideToast();
            if (style === 'success') router.push("/profiles/user/githubInfo");  
          },
          style === 'success' ? 1000 : 3000
        );
      }
    );
    router.push("/profiles/user/githubInfo");
  };

  return (
    <div className="flex flex-col justify-center px-80 h-screen text-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col gap-12 max-w-500"
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
