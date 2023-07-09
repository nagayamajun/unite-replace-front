import { EmailAndPasswordForm } from "@/components/organisms/EmailAndPasswordForm";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { authRepository } from "@/modules/auth/auth.repository";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthButton } from "../../atoms/AuthButton";

type FormData = {
  email: string;
  password: string;
};

export const SignUp = () => {
  const router = useRouter();

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const onSubmit = ({ email, password }: FormData) => {
    authRepository
      .signUpWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          setIsOpen(true);
          setModalMessage(result.message);
          setColor(result.success);

          setTimeout(
            () => {
              setIsOpen(false);
              if (result.success) {
                router.push("/signIn");
              }
            },
            result.success ? 2000 : 4000
          );
        }
      });
  };

  const onClickGoogleOrGithub = (
    promise: Promise<{
      success: boolean;
      message: string;
    }>
  ) => {
    promise.then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message);
        setColor(result.success);

        setTimeout(
          () => {
            setIsOpen(false);
            if (result.success) {
              router.push("/profiles/otherThanTech");
            }
          },
          result.success ? 2000 : 4000
        );
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center w-4/5 sm:w-base">
      <h1 className="text-2xl sm:text-3xl font-bold">
          <span className="text-green-700">U</span>N
          <span className="text-pink-400">I</span>TE
        </h1>
      <EmailAndPasswordForm onSubmit={onSubmit} buttonText="新規登録" />
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
              onClickGoogleOrGithub(authRepository.signInWithGoogle())
            }
          >
            Continue with Google
          </AuthButton>
          <AuthButton
            src="/github-mark.png"
            onClick={async () =>
              onClickGoogleOrGithub(authRepository.signInWithGithub())
            }
          >
            Continue with GitHub
          </AuthButton>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-sm sm:text-base">アカウンントをお持ちの方　</p>
        <Link href="/signIn" className="font-bold">
          ログイン
        </Link>
      </div>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
    </div>
  );
};
