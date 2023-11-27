import { useUserSignUp } from "@/application/usecases/userSignUp";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { AuthLogo } from "@/ui/auth/shared-components/AuthLogo";
import { AuthWithUsingGoogleOrGitHub } from "@/ui/auth/shared-components/AuthWithUsingGoogleOrGithub";
import { EmailAndPasswordForm } from "@/ui/auth/shared-components/EmailAndPasswordForm";
import { OrDivider } from "@/ui/auth/shared-components/OrDivider";
import { SignInSignUpToggle } from "@/ui/auth/shared-components/SignInSignUpToggle";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const { userSignUp }  = useUserSignUp();

  const onSubmit = async ({ email, password }: AuthWithEmailAndPassword) => {
    const isSuccess = await userSignUp({ email, password });
    if (isSuccess) router.push("/profiles/user/otherThanTech");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center w-4/5 sm:w-base">
        <AuthLogo />

        <EmailAndPasswordForm onSubmit={onSubmit} buttonText="新規登録" />

        <OrDivider />

        <AuthWithUsingGoogleOrGitHub />

        <SignInSignUpToggle
          innerText="アカウントをお持ちの方"
          path="/signIn"
          toggleText="ログイン"
        />
      </div>
    </div>
  );
};

export default SignUp
