import { UserState, UserStateType } from "@/stores/atoms";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PlainInput } from "../../../../components/molecules/Input/PlainInput";
import { EditProfileModal } from "../organisms/Modal/EditProfileModal";
import { FormField } from "../../../../components/molecules/FormField/FormField";
import { GraduationYearRadio } from "../molecules/Radio/GraduationYearRadio";
import { ProgrammingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";
import { RecruitCard } from "@/features/recruit/components/organisms/Card/RecruitCard";
import { Recruit } from "@/features/recruit/types/recruit";
import { useRouter } from "next/router";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useCertainUser } from "@/hooks/useCertainUser";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import Link from "next/link";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";

import { useRelatedRecruitsByUserId } from "@/hooks/useRelatedRecruitsByUserId";
import { PiSignOutBold } from "react-icons/pi";
import { authRepository } from "@/features/auth/modules/auth/auth.repository";
import { ConfirmModal } from "@/components/organisms/Modal/ConfirmModal";
import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import Image from "next/image";
import { useRecruitsByRecruiterId } from "@/features/recruit/hooks/useRecruitsByRecruiterId";
import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom";
import { ScoutRepository } from "../../modules/scout/scout.repository";

export const UserProfile = (): JSX.Element => {
  const router = useRouter();
  const { id: userId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  //操作userとプロフィール主userの情報取得
  const operatorUser = useRecoilValue<UserStateType>(UserState);
  const isMyself = operatorUser?.id === userId;
  const setMyselfState = useSetRecoilState<UserStateType>(UserState);
  const {
    certainUser: profileUser,
    setCertainUser: setProfileUser,
    error,
  } = useCertainUser(userId as string | undefined);
  const { relatedRecruits } = useRelatedRecruitsByUserId(userId as string);
  const { recruitsByRecruiterId } = useRecruitsByRecruiterId(userId as string);

  const operatorEmployee = useRecoilValue<EmployeeStateType>(EmployeeState);

  const [isLoading, setIsLoading] = useState(true);

  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isGraduationYearOpen, setIsGraduationYearOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  //ログアウト失敗/成功notice
  const [isSignOutNoticeOpen, setIsSignOutNoticeOpen] = useState(false);
  const [signOutNoticeMessage, setSignOutNoticeMessage] = useState("");
  const [signOutNoticeColor, setSignOutNoticeColor] = useState<boolean>();
  const closeSignOutNotice = () => setIsSignOutNoticeOpen(false);

  //プロフィール編集失敗/成功notice
  const [isProfileNoticeOpen, setIsProfileNoticeOpen] = useState(false);
  const [profileNoticeMessage, setProfileNoticeMessage] = useState("");
  const [profileNoticeColor, setProfileNoticeColor] = useState<boolean>();
  const closeProfileNotice = () => setIsProfileNoticeOpen(false);

  useEffect(() => {
    setIsLoading(true);
    if (profileUser) {
      setIsLoading(false);
    }
    if (error) {
      router.push("/404");
    }
  }, [profileUser]);

  const onSignOut = async () => {
    await authRepository.logOut().then((result) => {
      setMyselfState(null);
      localStorage.clear();

      //notice表示
      setIsSignOutNoticeOpen(true);
      setSignOutNoticeMessage(result.message);
      setSignOutNoticeColor(result.success);

      router.push("/signIn");
    });
  };

  const onEditSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({
      ...submitData,
      imageFile: submitData.imageFile && submitData.imageFile[0],
    }).then((result) => {
      //notice表示
      setIsProfileNoticeOpen(true);
      setProfileNoticeMessage(result.message);
      setProfileNoticeColor(result.success);

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
          setIsProfileNoticeOpen(false);
        },
        result.success ? 2000 : 4000
      );
    });
  };

  const onScoutFromEmployee = async () => {
    await ScoutRepository.sendScout(userId as string)
      .then((scoutWithRoomId) => {
        router.push(`/chat/${scoutWithRoomId.roomId}`);
      })
      .catch((error) => {
        //notice表示
        setIsProfileNoticeOpen(true);
        setProfileNoticeMessage(error.message);
        setProfileNoticeColor(false);

        setTimeout(() => {
          setIsProfileNoticeOpen(false);
        }, 2000);
      });
  };

  if (isLoading || !profileUser) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center gap-y-28 text-[16px] pb-20 w-full">
      <div className="flex flex-col items-center gap-24 w-4/5 sm:w-sm md:w-md lg:w-lg rounded-md">
        {/* ログアウトボタン */}
        <div className={isMyself ? "" : "hidden"}>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="absolute top-[70px] sm:top-[20px] right-[20px] flex items-center gap-2 rounded-md p-2 border-2"
          >
            <p className="font-bold text-red-400">ログアウト</p>
            <PiSignOutBold />
          </button>
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          modalTitle="ログアウトしますか？"
          onClickEvent={onSignOut}
        />
        {/* ログアウト失敗/成功notice */}
        <SuccessOrFailureModal
          isOpen={isSignOutNoticeOpen}
          closeModal={closeSignOutNotice}
          modalMessage={signOutNoticeMessage}
          modalBgColor={signOutNoticeColor!}
        />
        {/* プロフィール */}
        <form
          onSubmit={handleSubmit(onEditSubmit)}
          className="flex flex-col gap-20 w-full sm:w-4/5"
        >
          <div className="mt-8 flex flex-col items-center gap-2">
            {/* アイコン */}
            <PersonIcon
              originalIconImageSrc={profileUser.imageUrl}
              originalIconImageAlt={`${profileUser.name}のアイコン`}
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
              defaultValue={profileUser.graduateYear}
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
              defaultValue={profileUser.githubAccount}
              disabled={!isMyself}
              labelFont="text-base"
              inputFont="text-sm sm:text-base"
            />
          ) : (
            <div className="flex flex-col gap-4 mb-4 w-full">
              <label htmlFor="nameInput" className="">
                GitHubアカウント
              </label>
              {profileUser.githubAccount ? (
                <Link
                  href={profileUser.githubAccount ?? ""}
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

          {/* 成功/失敗notice */}
          <SuccessOrFailureModal
            isOpen={isProfileNoticeOpen}
            closeModal={closeProfileNotice}
            modalMessage={profileNoticeMessage}
            modalBgColor={profileNoticeColor!}
          />
        </form>

        {/* 操作ユーザーがプロフィール主の場合のみ以下を表示 */}
        {isMyself && (
          <>
            {/* userが作成している募集 */}
            <div className="flex flex-col gap-6 w-full sm:w-4/5">
              <p>作成した募集</p>
              <div className="flex gap-4 overflow-scroll">
                {recruitsByRecruiterId && recruitsByRecruiterId.length > 0 ? (
                  recruitsByRecruiterId.map(
                    (recruit: Recruit, index: number) => (
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
                    )
                  )
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
            <div className="flex flex-col gap-6 w-full sm:w-4/5 ">
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
          </>
        )}

        {operatorEmployee && (
          <button
            onClick={onScoutFromEmployee}
            className="fixed right-20 bottom-16 ml-5 bg-green-500 text-white px-6 py-2 rounded-md"
          >
            スカウトする (話を聞いてみる)
          </button>
        )}
      </div>
    </div>
  );
};
