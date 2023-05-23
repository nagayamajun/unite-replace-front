import { UserState, UserStateType } from "@/global-states/atoms";
import { axiosInstance, setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useAuth = (): UserStateType => {
  const router = useRouter();
  const [user, setUser] = useRecoilState<UserStateType>(UserState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      console.log(authUser?.uid);
      if (authUser) {
        const token = await authUser.getIdToken();
        setAuthToken(token);
        const user = (
          await axiosInstance.get("/user/find-by-firebase-uid").catch((err) => {
            throw new Error(`user not found. error: ${err}`);
          })
        ).data;
        if (user) {
          setUser(user);
        }
      } else {
        // resetStatus();
        //Authコンポーネントにpush
        router.push("/signIn");
      }
    });
    return () => unsub();
  }, []);

  return user;
};

//リファクタ
//今はmainでしか認証ができていないが認証に関連するコンポーネント単位でできるようにする。
