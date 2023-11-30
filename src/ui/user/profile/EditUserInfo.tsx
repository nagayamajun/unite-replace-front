import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { useForm } from "react-hook-form";
import { EditProfileModal } from "../../../features/user/components/organisms/Modal/EditProfileModal";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { FormField } from "@/components/molecules/FormField/FormField";
import { GraduationYearRadio } from "../../../features/user/components/molecules/Radio/GraduationYearRadio";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useEditUserProfile } from "@/application/usecases/editUserProfile";
import { User } from "@/domein/user";
import { SkillSelect } from "@/components/Select/SkillSelect";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { UserStateType } from "@/infrastructures/frameworks/store";

type Props = {
  profileUser: User
  setProfileUser: Dispatch<SetStateAction<User | undefined>>
  setMyselfState: (user: UserStateType) => void
  isMyself: boolean
}

export const EditUserInfo = ({profileUser, setProfileUser, setMyselfState, isMyself}: Props): JSX.Element => {
  const { editUserProfile } = useEditUserProfile();
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
    const user = await editUserProfile(submitData);
    if (user) {
      setProfileUser(user);
      setMyselfState(user);
    }
    setIsImageOpen(false);
    setIsGraduationYearOpen(false);
    setIsSkillOpen(false);

    reset({});
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
          <SkillSelect
            registerLabel="programingSkills"
            labelText="スキル"
            control={control}
            placeholder="スキルを選択してください(複数選択可)"
            errors={errors}
            rules={{ required: "必須項目です" }}
            defaultValue={profileUser?.programingSkills as ProgrammingSkill[]}
          />
        </div>
      </EditProfileModal>
    </form>

  )
}