import { authRepository } from "@/modules/auth/auth.repository";
import { useRouter } from "next/router";
import { AuthButton } from "../../atoms/AuthButton";
import Link from "next/link";
import Image from "next/image";
import { EmailAndPasswordForm } from "@/components/organisms/EmailAndPasswordForm";
import { useState } from "react";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";

type FormData = {
  email: string;
  password: string;
}

export const SignUp = () => {
  const router = useRouter();

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage ,setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false)

  const onSubmit = ({email, password}: FormData) => {
    authRepository
      .signUpWithEmail(email, password)
        .then(result => {
          if(result) {
            setIsOpen(true)
            setModalMessage(result.message)
            setColor(result.success);

            setTimeout(() => {
              setIsOpen(false)
              if (!result.success) return window.location.reload();
              router.push("/profiles/otherThanTech")
            }, 2000)
          }
        })
  };

  return (
    <div className="flex flex-col items-center h-screen mt-5">
        <EmailAndPasswordForm
          onSubmit={onSubmit}
          buttonText="新規登録"
        />
        <div className="flex sm:w-1/2 w-3/5 my-6">
          <div className="h-0 w-1/3 border-b border-black mt-3"></div>
          <div className="flex justify-center items-center w-1/3">
            <p>または</p>
          </div>
          <div className="h-0 w-1/3 border-b border-black mt-3"></div>
        </div>

        <div className="flex col items-center justify-center sm:w-1/2 w-3/5 ">
          <div className="w-full ">
          <AuthButton
              src="/home.png"
              onClick={() =>
                authRepository
                  .signInWithGoogle()
                  .then(result => {
                    if(result) {
                      setIsOpen(true)
                      setModalMessage(result.message)
                      setColor(result.success);

                      setTimeout(() => {
                        setIsOpen(false)
                        if (!result.success) return window.location.reload();
                        router.push("/profiles/otherThanTech")
                      }, 2000)
                    }
                  })
              }
            >
              Continue with Google
            </AuthButton>
            <AuthButton
              src="/github-mark.png"
              onClick={
                authRepository.signWithGithub
              }
            >
              Continue with GitHub
            </AuthButton>
          </div>
        </div>

        <div className="flex justify-center">
             <p className="text-sm sm:text-base">アカウンントをお持ちの方　</p>
            <Link href="/signUp" className="font-bold">
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
  );
};
