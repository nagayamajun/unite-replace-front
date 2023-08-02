import { UserState, UserStateType } from "@/stores/atoms";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../../../components/molecules/Button/SubmitButton";
import { PlainInput } from "../../../../components/molecules/Input/PlainInput";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const GithubInfoPage = (): JSX.Element => {
  useAuth();
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const { register, handleSubmit } = useForm();
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
              router.push("/homeScreen");
            }
          },
          result.success ? 2000 : 4000
        );
      }
    );
  };

  return (
    <div className="flex flex-col justify-center px-80 h-screen text-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col gap-12 max-w-500"
      >
        <PlainInput
          labelText="GitHubアカウント (アカウントがなければ「完了」を押して飛ばしてください。)"
          placeholder="(例) https://github.com/[username]"
          defaultValue={userState?.githubAccount}
          register={register}
          registerLabel="githubAccount"
        />
        <div className="flex justify-center mt-24">
          <SubmitButton innerText="完了" />
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
