import { ToastResult } from "@/types/toast";
import { AuthButton } from "../../../features/auth/share-components/AuthButton"
import { useToast } from "@/hooks/useToast";
import { authRepository } from "../../../features/auth/modules/auth/auth.repository";
import { useRouter } from "next/router";
import { useGoogleAuth } from "../../../features/auth/hooks/useGoogleAuth";
import { useGithubAuth } from "../../../features/auth/hooks/useGithubAuth";

export const AuthWithUsingGoogleOrGitHub = () => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();

  //Google認証
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithGithub } = useGithubAuth();

  const onClickGoogleOrGithub = (promise: Promise<any>) => {
    promise.then((response) => {
      const routePath = !response ? "/profiles/user/otherThanTech" : "/homeScreen";
      router.push(routePath);
    })
  };

  return (
    <div className="flex col items-center justify-center w-full ">
      <div className="w-full ">
        <AuthButton
          src="/home.png"
          onClick={async () =>
            onClickGoogleOrGithub(signInWithGoogle())
          }
        >
          Continue with Google
        </AuthButton>
        <AuthButton
          src="/github-mark.png"
          onClick={async () =>
            onClickGoogleOrGithub(signInWithGithub())
          }
        >
          Continue with GitHub
        </AuthButton>
      </div>
    </div>
  )
}