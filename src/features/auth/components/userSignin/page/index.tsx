import { useRouter } from "next/router";
import { EmailAndPasswordForm } from "@/features/auth/share-components/EmailAndPasswordForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { AuthLogo } from "@/features/auth/share-components/AuthLogo";
import { OrDivider } from "@/features/auth/share-components/OrDivider";
import { AuthWithUsingGoogleOrGitHub } from "@/features/auth/share-components/AuthWithUsingGoogleOrGithub";
import { SignInSignUpToggle } from "@/features/auth/share-components/SignInSignUpToggle";
import { useUserSignIn } from "../hooks/useUserSignIn";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";


export const SignIn: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { userSignIn } = useUserSignIn()
  useAuth();


  const onSubmit = async({ email, password }: AuthWithEmailAndPassword) => {
    const user = await userSignIn({email, password});
    const routePath = !user?.name ? "/profiles/user/otherThanTech" : "/homeScreen";
    router.push(routePath);
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center w-4/5 sm:w-base">
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
};
