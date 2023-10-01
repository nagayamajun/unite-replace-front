import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/router";
import { useUserSignUp } from "../hooks/useUserSignUp";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { EmailAndPasswordForm } from "../../../share-components/EmailAndPasswordForm";
import { AuthLogo } from "@/features/auth/share-components/AuthLogo";
import { OrDivider } from "@/features/auth/share-components/OrDivider";
import { AuthWithUsingGoogleOrGitHub } from "@/features/auth/share-components/AuthWithUsingGoogleOrGithub";
import { SignInSignUpToggle } from "@/features/auth/share-components/SignInSignUpToggle";


export const SignUp = () => {
  const router = useRouter();
  const { showToast, hideToast, isShown } = useToast();
  const { userSignUp }  = useUserSignUp();

  const onSubmit = async({ email, password }: AuthWithEmailAndPassword) => {
    const isSuccess = await userSignUp({ email, password });
    if (isSuccess) router.push("/profiles/user/otherThanTech");

    // await userSignUp({email, password})
    //   .then(({ message, style }) => {
    //     showToast({ message, style })
    //     setTimeout(
    //       () => {
    //         hideToast();
    //         if (style === 'success') router.push("/profiles/user/otherThanTech");
    //       },
    //       style === 'success' ? 2000 : 4000
    //     );
    //   })
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
