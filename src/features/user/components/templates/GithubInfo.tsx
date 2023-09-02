import { UserState, UserStateType } from "@/stores/atoms";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../../../components/molecules/Button/SubmitButton";
import { PlainInput } from "../../../../components/molecules/Input/PlainInput";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ToastResult } from "@/types/toast";

export const GithubInfoPage = (): JSX.Element => {
  useAuth();
  const [userState, setUserState] = useRecoilState<UserStateType>(UserState);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { showToast, hideToast } = useToast();

  const onSubmit = async (submitData: any) => {
    await UserRepository.updateUserInfo({ ...userState, ...submitData })
      .then(({ message, style }: ToastResult) => {
        setUserState({ ...userState, ...submitData });

        showToast({ message, style });
        setTimeout(
          () => {
            hideToast();
            if (style === 'success') router.push("/homeScreen");
          },
          style === 'success' ? 2000 : 4000
        );
      });
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
    </div>
  );
};
