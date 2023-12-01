import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/infrastructures/frameworks/store";
import { useGlobalUser } from "@/adapters/globalState.adapter";
import { useAxios } from "@/adapters/axios.adapter";
import { useUser } from "@/adapters/user.adapter";
import { useNotice } from "@/adapters/notice.adapter";

export const useAuth = (): UserStateType => {
  const router = useRouter();
  const { user, setUser } = useGlobalUser();
  const axiosService = useAxios();
  const userService = useUser();
  const noticeService = useNotice();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      //操作者がfirebase上でログインしている状態でなければ、サインインページにリダイレクト
      if (!authUser) {
        noticeService.info('ログインが必須のページです');
        router.push("/signIn");
        return;
      }

      const token = await authUser.getIdToken();
      axiosService.setAuthToken(token);
      const user = await userService.findByFirebaseUid();

      //firebase上でログインしている操作者がDBのuserレコード上では見つからなかった場合も、サインインページにリダイレクト
      if (!user) {
        noticeService.error('ログイン情報が見つかりませんでした。')
        router.push("/signIn");
        return;
      }
      
      setUser(user);
    });
    return () => unsub();
  }, []);

  return user;
};