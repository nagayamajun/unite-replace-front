import { UserState } from "@/global-states/atoms";
import { UserRepository } from "@/modules/user/user.repository";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../atoms/SubmitButton";
import { PlainInput } from "../../atoms/PlainInput";

export const GithubInfoPage = (): JSX.Element => {
  const [userState, setUserState] = useRecoilState(UserState);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // const onSubmit = async (submitData: any) => {
  //   setUserState({ ...userState, ...submitData });
  //   //※デプロイまでには↓エラーはスローしないようにしたい
  //   if (!userState?.uid) throw new Error("userState.uidがないです！");
  //   await UserRepository.update(userState.uid, { ...userState, ...submitData });
  //   router.push("/homeScreen");
  // };

  return (
    <div className="flex flex-col justify-center px-80 h-screen bg-red-50 text-lg">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col gap-12 max-w-500"
      >
        <PlainInput
          labelText="GitHub アカウント名"
          placeholder="https://github.com/<hoge> の<hoge>の部分"
          register={register}
          registerLabel="github"
        />
        <div className="flex justify-center mt-24">
          <SubmitButton innerText="完了" />
        </div>
      </form>
    </div>
  );
};
