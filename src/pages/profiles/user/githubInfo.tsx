import { useUpdateUserInfo } from "@/application/usecases/updateUserInfo";
import { PlainButton } from "@/components/Button/PlainButton";
import { PlainInput } from "@/components/Input/PlainInput";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const GithubInfo = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { updateUserInfo } = useUpdateUserInfo();

  const onSubmit = async (submitData: any): Promise<void> => {
    const isSuccess = await updateUserInfo(submitData);
    if (isSuccess) {
      router.push("/homeScreen");
    };
  };

  return (
    <div className="flex flex-col justify-center px-80 h-screen text-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col gap-12 max-w-500"
      >
        <PlainInput
          label="GitHubアカウント (アカウントがなければ「完了」を押して飛ばしてください。)"
          placeholder="(例) https://github.com/[username]"
          register={register('githubAccount')}
          inputType="text"
        />
        <div className="flex justify-center mt-24">
          <PlainButton innerText="完了" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default GithubInfo;
