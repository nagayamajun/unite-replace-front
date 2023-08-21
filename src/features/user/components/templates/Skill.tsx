import { UserState } from "@/stores/atoms";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../../../components/molecules/Button/SubmitButton";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { UserRepository } from "@/features/user/modules/user/user.repository";

export type Option = {
  label: string;
  value: string;
};

export const SkillPage = (): JSX.Element => {
  const { handleSubmit, control } = useForm();
  const [userState, setUserState] = useRecoilState(UserState);
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  //プロフィール編集失敗/成功notice
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeColor, setNoticeColor] = useState<boolean>();
  const closeNotice = () => setIsNoticeOpen(false);

  //enum型からスキルオブジェクト作成
  const options = Object.values(ProgrammingSkill).map((skill) => ({
    value: skill,
    label: skill,
  }));

  const onSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({ ...userState, ...submitData }).then(
      (result) => {
        setUserState({ ...userState, ...submitData });

        //notice表示
        setIsNoticeOpen(true);
        setNoticeMessage(result.message);
        setNoticeColor(result.success);

        setTimeout(
          () => {
            setIsNoticeOpen(false);
            if (result.success) {
              router.push("/profiles/user/githubInfo");
            }
          },
          result.success ? 1000 : 3000
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

      {/* 成功/失敗notice */}
      <SuccessOrFailureModal
        isOpen={isNoticeOpen}
        closeModal={closeNotice}
        modalMessage={noticeMessage}
        modalBgColor={noticeColor!}
      />
    </div>
  );
};
