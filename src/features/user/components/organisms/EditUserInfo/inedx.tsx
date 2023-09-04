import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useToast } from "@/hooks/useToast";
import { UserStateType } from "@/stores/atoms";
import { ToastResult } from "@/types/toast";
import { Controller, useForm } from "react-hook-form";
import { SetterOrUpdater } from "recoil";
import { EditProfileModal } from "../Modal/EditProfileModal";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { FormField } from "@/components/molecules/FormField/FormField";
import { GraduationYearRadio } from "../../molecules/Radio/GraduationYearRadio";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProgrammingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";
import { User } from "@/features/user/types/user";

type Props = {
  profileUser: User
  setProfileUser: Dispatch<SetStateAction<User | undefined>>
  error: Error | undefined
  setMyselfState: SetterOrUpdater<UserStateType>
  isMyself: boolean
}

export const EditUserInfo = ({profileUser, setProfileUser, error, setMyselfState, isMyself}: Props): JSX.Element => {
  const { showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isGraduationYearOpen, setIsGraduationYearOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  const onEditSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({
      ...submitData,
      imageFile: submitData.imageFile && submitData.imageFile[0],
    }).then(({ message, style, data }: ToastResult) => {
      showToast({ message, style });

      //userProfileの状態と認証されている自分のrecoil stateを更新
      if (data) {
        setProfileUser(data);
        setMyselfState(data);
      }

      //モーダル系全部閉じる
      setIsImageOpen(false);
      setIsGraduationYearOpen(false);
      setIsSkillOpen(false);

      //hook-formのregisterされてる値をリセット
      reset({});

      setTimeout(
        () => {
          hideToast();
        },
        style === 'success' ? 2000 : 4000
      );
    });
  };


  return (
    <form
      onSubmit={handleSubmit(onEditSubmit)}
      className="flex flex-col gap-20 w-full sm:w-4/5"
    >
      <div className="mt-8 flex flex-col items-center gap-2">
        {/* アイコン */}
        <PersonIcon
          originalIconImageSrc={profileUser?.imageUrl}
          originalIconImageAlt={`${profileUser?.name}のアイコン`}
          originalIconClassName="rounded-full border border-black w-40 h-40"
          defaultIconFill="gray"
          defaultIconClassName="w-40 h-40 rounded-full bg-white border border-black p-2 color-black-100"
          onClick={() => isMyself && setIsImageOpen(true)}
        />
        <EditProfileModal
          isOpen={isImageOpen}
          setIsOpen={setIsImageOpen}
          onClickOk={handleSubmit(onEditSubmit)}
        >
          <PlainInput
            labelText="アイコン画像"
            placeholder="アイコン画像を変更できます"
            inputType="file"
            register={register}
            registerLabel="imageFile"
          />
        </EditProfileModal>
        {/* 名前 */}
        <PlainInput
          labelText="名前"
          placeholder="フルネームをご入力ください"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          registerLabel="name"
          rules={{ required: "必須項目です" }}
          errors={errors}
          defaultValue={profileUser?.name}
          disabled={!isMyself}
          labelFont="text-base"
          inputFont="text-sm sm:text-base"
        />
      </div>
      {/* 学校情報 */}
      <PlainInput
        labelText="大学・専門"
        placeholder="学校名"
        onBlur={handleSubmit(onEditSubmit)}
        register={register}
        registerLabel="university"
        defaultValue={profileUser?.university}
        disabled={!isMyself}
        labelFont="text-base"
        inputFont="text-sm sm:text-base"
      />
      {/* 卒業予定年度 */}
      <FormField
        labelText="卒業予定年度"
        editable={isMyself}
        onCLick={() => setIsGraduationYearOpen(true)}
      >
        <div
          className={`px-8 py-2 rounded-3xl bg-gray-200 text-base text-center w-1/4 min-w-[120px] whitespace-nowrap ${
            profileUser?.graduateYear ?? "hidden"
          }`}
        >
          {profileUser?.graduateYear}
        </div>
      </FormField>
      <EditProfileModal
        isOpen={isGraduationYearOpen}
        setIsOpen={setIsGraduationYearOpen}
        onClickOk={handleSubmit(onEditSubmit)}
      >
        <GraduationYearRadio
          control={control}
          defaultValue={profileUser?.graduateYear}
          defaultChipColor={"bg-gray-100"}
        />
      </EditProfileModal>
      {/* GtHubアカウント */}
      {isMyself ? (
        <PlainInput
          labelText="GitHubアカウント"
          placeholder="(例) https://github.com/[username]"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          registerLabel="githubAccount"
          defaultValue={profileUser?.githubAccount}
          disabled={!isMyself}
          labelFont="text-base"
          inputFont="text-sm sm:text-base"
        />
      ) : (
        <div className="flex flex-col gap-4 mb-4 w-full">
          <label htmlFor="nameInput" className="">
            GitHubアカウント
          </label>
          {profileUser?.githubAccount ? (
            <Link
              href={profileUser?.githubAccount ?? ""}
              target="_blank"
              className="ml-10 w-12 h-12"
            >
              <Image
                src="/github-mark.png"
                alt="GitHubロゴ"
                width={240}
                height={240}
              />
            </Link>
          ) : (
            <Image
              src="/github-mark.png"
              alt="GitHubロゴ"
              width={240}
              height={240}
              className="ml-10 w-12 h-12 opacity-10"
            />
          )}
        </div>
      )}
      {/* プログラミングスキル */}
      <FormField
        labelText="プログラミングスキル"
        editable={isMyself}
        onCLick={() => setIsSkillOpen(true)}
      >
        <div className="flex flex-wrap gap-4">
          {profileUser?.programingSkills?.map((skill) => (
            <div
              key={skill}
              className="px-8 py-2 rounded-3xl bg-gray-200 text-base"
            >
              {skill}
            </div>
          ))}
        </div>
      </FormField>
      <EditProfileModal
        isOpen={isSkillOpen}
        setIsOpen={setIsSkillOpen}
        onClickOk={handleSubmit(onEditSubmit)}
      >
        <div className="flex flex-col gap-6">
          <div>プログラミングスキル</div>
          <Controller
            name="programingSkills"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={ProgrammingSkillOptions}
                onChange={(selectedSkills) => {
                  field.onChange(
                    selectedSkills.map((skill) => skill.value)
                  );
                }}
                placeholder="スキル名を選択してください (複数選択可)"
              />
            )}
          />
        </div>
      </EditProfileModal>
    </form>

  )
}