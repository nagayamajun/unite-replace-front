import { authRepository } from "@/features/auth/modules/auth/auth.repository";
import { useRouter } from "next/router";
import { AuthButton } from "../molecules/Button/AuthButton";
import Link from "next/link";
import { EmailAndPasswordForm } from "@/features/auth/components/organisms/Form/EmailAndPasswordForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ToastResult } from "@/types/toast";

type FormData = {
  email: string;
  password: string;
};

export const SignIn: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();
  useAuth();

  const onSubmit = ({ email, password }: FormData): void => {
    authRepository.signInWithEmail({ email, password }).then(({ message, style, data }: ToastResult) => {
      showToast({ message, style });
      setTimeout(
        () => {
          hideToast();
          if (style === 'success') {
            const routePath = !data.name ? "/profiles/user/otherThanTech" : "/homeScreen";
            router.push(routePath);
          }
        },
        style === 'success' ? 2000 : 4000
      );
    });
  };

  const onClickGoogleOrGithub = ({promise} :{ promise: Promise<ToastResult> }): void => {
    promise.then(({ message, style, data }: ToastResult) => {
      setTimeout(
        () => {
          showToast({ message, style });
          if (style === 'success') {
            const routePath = !data ? "/profiles/user/otherThanTech" : "/homeScreen";
            router.push(routePath);
          };
        },
        style === 'success' ? 2000 : 4000
      );
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center w-4/5 sm:w-base">
        <h1 className="text-2xl sm:text-3xl font-bold">
          <span className="text-green-700">U</span>N
          <span className="text-pink-400">I</span>TE
        </h1>
        <EmailAndPasswordForm onSubmit={onSubmit} buttonText="ログイン" />
        <div className="flex  w-full my-6">
          <div className="h-0 w-1/3 border-b border-black mt-3"></div>
          <div className="flex justify-center items-center w-1/3">
            <p>または</p>
          </div>
          <div className="h-0 w-1/3 border-b border-black mt-3"></div>
        </div>

        <div className="flex col items-center justify-center w-full ">
          <div className="w-full ">
            <AuthButton
              src="/home.png"
              onClick={async () =>
                onClickGoogleOrGithub({promise: authRepository.signInWithGoogle()})
              }
            >
              Continue with Google
            </AuthButton>
            <AuthButton
              src="/github-mark.png"
              onClick={async () =>
                onClickGoogleOrGithub({promise: authRepository.signInWithGithub()})
              }
            >
              Continue with GitHub
            </AuthButton>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-sm sm:text-base">まだアカウントをお持ちでない方　</p>
          <Link href="/signUp" className="font-bold">
            登録
          </Link>
        </div>
      </div>
    </div>
  );
};

//SignUpとSignInも１つのコンポーネントにまとめる
