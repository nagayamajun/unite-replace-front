import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { setAuthToken } from "@/libs/axios";
import { UserStateType } from "@/infrastructures/frameworks/store";
import { useGlobalUser } from "@/adapters/globalState.adapter";

export const useAuth = (): UserStateType => {
  const router = useRouter();
  const { user, setUser } = useGlobalUser();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      //操作者がfirebase上でログインしている状態でなければ、サインインページにリダイレクト
      if (!authUser) {
        router.push("/signIn");
        return;
      }

      const token = await authUser.getIdToken();
      setAuthToken(token);

      const user = await UserRepository.findUserByFirebaseUID();
      //firebase上でログインしている操作者がDBのuserレコード上では見つからなかった場合も、サインインページにリダイレクト
      if (!user) {
        router.push("/signIn");
        return;
      }
      setUser(user);
    });
    return () => unsub();
  }, []);

  return user;
};