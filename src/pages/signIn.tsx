import { useUserSignIn } from "@/application/usecases/userSignIn";
import { AuthLogo } from "@/ui/auth/shared-components/AuthLogo";
import { AuthWithUsingGoogleOrGitHub } from "@/ui/auth/shared-components/AuthWithUsingGoogleOrGithub";
import { EmailAndPasswordForm } from "@/ui/auth/shared-components/EmailAndPasswordForm";
import { OrDivider } from "@/ui/auth/shared-components/OrDivider";
import { SignInSignUpToggle } from "@/ui/auth/shared-components/SignInSignUpToggle";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

const SignIn = (): JSX.Element => {
  useAuth();
  const router = useRouter();
  const { userSignIn } = useUserSignIn()

  const onSubmit = async({ email, password }: AuthWithEmailAndPassword) => {
    const user = await userSignIn({email, password});
    const routePath = !user?.name ? "/profiles/user/otherThanTech" : "/homeScreen";
    router.push(routePath);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center w-4/5 sm:w-base space-y-2">
        <AuthLogo />

        <EmailAndPasswordForm onSubmit={onSubmit} buttonText="ログイン" />

        <OrDivider />

        <AuthWithUsingGoogleOrGitHub />

        <SignInSignUpToggle
          innerText="まだアカウントをお持ちでない方"
          path="/signUp"
          toggleText="新規登録"
        />
      </div>
    </div>
  );
}
export default SignIn
