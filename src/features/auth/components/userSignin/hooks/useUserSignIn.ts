import { FAIL_TO_SIGN_IN, SUCCESS_IN_SIGN_IN } from "@/constants/constants";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { User } from "@/features/user/types/user";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useLoading } from "@/hooks/useLoading"
import { useToast } from "@/hooks/useToast"
import { setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useUserSignIn = () => {
  const { showLoading, hideLoading } = useLoading()
  const { showToast, hideToast } = useToast();

  const userSignIn = async(params: AuthWithEmailAndPassword) => {
    try {
      showLoading();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      const token = await userCredential.user.getIdToken();
      setAuthToken(token);
      //リファクタ: この層からとってはいけないのでapi層をfeature-userにも導入したら変更
      const user = await UserRepository.findUserByFirebaseUID();
      hideLoading();
      showToast({
        style: 'success', 
        message: SUCCESS_IN_SIGN_IN
      })

      return user as User
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      hideLoading();
      showToast({
        style: 'failed',
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      });

      return undefined
    }
  };

  return {
    userSignIn
  }
}