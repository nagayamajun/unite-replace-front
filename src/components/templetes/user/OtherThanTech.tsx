import { UserState, UserStateType } from "@/global-states/atoms";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../atoms/SubmitButton";
import { PlainInput } from "../../atoms/PlainInput";
import { GraduationYearRadio } from "../../atoms/GraduationYearRadio";
import { PlainTextArea } from "@/components/atoms/PlainTextarea";
import { useAuth } from "@/hooks/useAuth";
import { UserRepository } from "@/modules/user/user.repository";
import { useEffect, useState } from "react";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { Loading } from "../common/Loading";

export const OtherThanTechPage = (): JSX.Element => {
  useAuth();
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userState) {
      setIsLoading(false);
    }
  }, [userState?.firebaseUID]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  //プロフィール編集失敗/成功notice
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeColor, setNoticeColor] = useState<boolean>();
  const closeNotice = () => setIsNoticeOpen(false);

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
              router.push("/profiles/user/skill");
            }
          },
          result.success ? 1000 : 3000
        );
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center my-5 ">
        <p className=" font-bold">情報を登録する</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-1/2 sm:w-3/5"
      >
        <PlainInput
          labelText="名前"
          placeholder="フルネームをご入力ください"
          defaultValue={userState?.name}
          register={register}
          registerLabel="name"
          errors={errors}
          rules={{ required: "必須項目です" }}
        />
        <PlainInput
          labelText="年齢"
          placeholder="数字のみで年齢をご記入ください"
          defaultValue={userState?.age}
          register={register}
          registerLabel="age"
          errors={errors}
        />
        <PlainInput
          labelText="都道府県"
          placeholder="兵庫県"
          defaultValue={userState?.prefecture}
          register={register}
          registerLabel="prefecture"
          errors={errors}
        />
        <PlainInput
          labelText="大学・専門"
          placeholder="〇〇大学"
          defaultValue={userState?.university}
          register={register}
          registerLabel="university"
          errors={errors}
        />
        <PlainInput
          labelText="学部・学科"
          placeholder="〇〇学部/△△学科"
          defaultValue={userState?.undergraduate}
          register={register}
          registerLabel="undergraduate"
          errors={errors}
        />
        <PlainTextArea
          registerLabel="selfPublicity"
          labelText="自己紹介"
          placeholder="自己PRなどご記入ください"
          defaultValue={userState?.selfPublicity}
          register={register}
          errors={errors}
          rules={{ required: "必須項目です" }}
        />

        <PlainTextArea
          registerLabel="careerVision"
          labelText="キャリアビジョン"
          placeholder="自身のキャリアについてご記入ください"
          defaultValue={userState?.careerVision}
          register={register}
          errors={errors}
          rules={{ required: "必須項目です" }}
        />
        <GraduationYearRadio
          control={control}
          defaultValue={userState?.graduateYear}
        />

        <div className="flex justify-center mt-4">
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
