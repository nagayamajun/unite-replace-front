import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "@/stores/atoms";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/stores/atoms";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { setAuthToken } from "@/libs/axios";

export const useAuth = (): UserStateType => {
  const router = useRouter();
  const [user, setUser] = useRecoilState<UserStateType>(UserState);

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

//リファクタ
//contextの形で認証が必要なページを囲う
