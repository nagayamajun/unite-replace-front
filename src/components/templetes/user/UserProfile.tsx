import { UserState, UserStateType } from "@/global-states/atoms";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PlainInput } from "../../atoms/PlainInput";
import { EditProfileModal } from "../../organisms/EditProfileModal";
import { FormField } from "../../atoms/FormField";
import { GraduationYearRadio } from "../../atoms/GraduationYearRadio";
import { ProgramingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";
import { RecruitCard } from "@/components/organisms/RecruitCard";
import { Recruit } from "@/types/recruit";
import { useRouter } from "next/router";
import { UserRepository } from "@/modules/user/user.repository";
import { useCertainUser } from "@/hooks/useCertainUser";
import { Loading } from "../common/Loading";
import Link from "next/link";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { useOwnRecruitsByUserId } from "@/hooks/useOwnRecruitsByUserId";
import { useRelatedRecruitsByUserId } from "@/hooks/useRelatedRecruitsByUserId";

export const UserProfile = (): JSX.Element => {
  const router = useRouter();
  const { id: userId } = router.query;

  const { register, handleSubmit, control, reset } = useForm();

  const mySelf = useRecoilValue<UserStateType>(UserState);
  const setMyselfState = useSetRecoilState<UserStateType>(UserState);
  const {
    certainUser: profileUser,
    setCertainUser: setProfileUser,
    error,
  } = useCertainUser(userId as string);
  const { relatedRecruits } = useRelatedRecruitsByUserId(userId as string);
  const { ownRecruits } = useOwnRecruitsByUserId(userId as string);

  const [isLoading, setIsLoading] = useState(true);

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isGraduationYearOpen, setIsGraduationYearOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  //失敗/成功notice
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeColor, setNoticeColor] = useState<boolean>();
  const closeNotice = () => setIsNoticeOpen(false);

  const isMyself = mySelf?.id === userId;

  useEffect(() => {
    setIsLoading(true);
    if (profileUser) {
      setIsLoading(false);
    }
    if (error) {
      router.push("/404");
    }
  }, [profileUser]);

  const onEditSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({
      ...submitData,
      imageFile: submitData.imageFile && submitData.imageFile[0],
    }).then((result) => {
      //notice表示
      setIsNoticeOpen(true);
      setNoticeMessage(result.message);
      setNoticeColor(result.success);

      //userProfileの状態と認証されている自分のrecoil stateを更新
      if (result.data) {
        setProfileUser(result.data);
        setMyselfState(result.data);
      }

      //モーダル系全部閉じる
      setIsImageOpen(false);
      setIsGraduationYearOpen(false);
      setIsSkillOpen(false);

      //hook-formのregisterされてる値をリセット
      reset({});

      setTimeout(
        () => {
          setIsNoticeOpen(false);
        },
        result.success ? 2000 : 4000
      );
    });
  };

  if (isLoading || !profileUser) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center gap-28 text-[16px] pb-20">
      <form
        onSubmit={handleSubmit(onEditSubmit)}
        className="flex flex-col gap-20 w-3/4 sm:w-1/2 md:w-1/3"
      >
        <div className="mt-20 flex flex-col items-center gap-2">
          {/* アイコン */}
          <Image
            src={profileUser.imageUrl ?? "/avatar.gif"}
            alt="人物アイコン"
            width={900}
            height={900}
            className="rounded-full border border-black w-60 h-60"
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
            defaultValue={profileUser.name}
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
          defaultValue={profileUser.university}
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
              profileUser.graduateYear ?? "hidden"
            }`}
          >
            {profileUser.graduateYear}
          </div>
        </FormField>
        <EditProfileModal
          isOpen={isGraduationYearOpen}
          setIsOpen={setIsGraduationYearOpen}
          onClickOk={handleSubmit(onEditSubmit)}
        >
          <GraduationYearRadio
            control={control}
            defaultChipColor={"bg-gray-100"}
          />
        </EditProfileModal>
        {/* GtHubアカウント */}
        <PlainInput
          labelText="GitHubアカウント名"
          placeholder="https://github.com/<hoge> の<hoge>の部分"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          registerLabel="githubAccount"
          defaultValue={profileUser.githubAccount}
          disabled={!isMyself}
          labelFont="text-base"
          inputFont="text-sm sm:text-base"
        />
        {/* プログラミングスキル */}
        <FormField
          labelText="プログラミングスキル"
          editable={isMyself}
          onCLick={() => setIsSkillOpen(true)}
        >
          <div className="flex flex-wrap gap-4">
            {profileUser.programingSkills?.map((skill) => (
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
                  options={ProgramingSkillOptions}
                  onChange={(selectedSkills) => {
                    field.onChange(selectedSkills.map((skill) => skill.value));
                  }}
                  placeholder="スキル名を選択してください (複数選択可)"
                />
              )}
            />
          </div>
        </EditProfileModal>

        {/* 成功/失敗notice */}
        <SuccessOrFailureModal
          isOpen={isNoticeOpen}
          closeModal={closeNotice}
          modalMessage={noticeMessage}
          modalBgColor={noticeColor!}
        />
      </form>
      {/* userが作成している募集 */}
      <div className="flex flex-col gap-6 w-3/4 sm:w-1/2 overflow-scroll">
        <p>作成した募集</p>
        <div className="flex gap-4 overflow-scroll">
          {ownRecruits && ownRecruits.length > 0 ? (
            ownRecruits.map((recruit: Recruit, index: number) => (
              //以降をcomponentに切り出したい
              <Fragment key={recruit.id}>
                <RecruitCard
                  id={recruit.id}
                  createdAt={recruit.createdAt}
                  headline={recruit.headline}
                  programingSkills={recruit.programingSkills}
                  hackthonName={recruit.hackthonName}
                />
              </Fragment>
            ))
          ) : (
            <p className="text-gray-500 my-16 w-full text-center">
              募集がありません。
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            hidden={!isMyself}
            href={`/profiles/${profileUser.id}/myRecruitsAndRelatedRecruits`}
            target="_blank"
          >
            もっと見る ＞
          </Link>
        </div>
      </div>
      {/* userが参加確定した募集 */}
      <div className="flex flex-col gap-6 w-3/4 sm:w-1/2 overflow-scroll">
        <p>参加する/参加した募集</p>
        <div className="flex gap-4 overflow-scroll">
          {relatedRecruits && relatedRecruits.length > 0 ? (
            relatedRecruits.map((recruit: Recruit, index: number) => (
              //以降をcomponentに切り出したい
              <Fragment key={recruit.id}>
                <RecruitCard
                  id={recruit.id}
                  createdAt={recruit.createdAt}
                  headline={recruit.headline}
                  programingSkills={recruit.programingSkills}
                  hackthonName={recruit.hackthonName}
                />
              </Fragment>
            ))
          ) : (
            <p className="text-gray-500 my-16 w-full text-center">
              募集がありません。
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            hidden={!isMyself}
            href={`/profiles/${profileUser.id}/myRecruitsAndRelatedRecruits`}
            target="_blank"
          >
            もっと見る ＞
          </Link>
        </div>
      </div>
    </div>
  );
};
