import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "@/global-states/atoms";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/global-states/atoms";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { User } from "../types/user";
import { findOneUser } from "@/modules/user/user.repository";
import { setAuthToken } from "@/libs/axios";


export const useAuth = (): UserStateType => {
  const router = useRouter();
  const [user, setUser ] = useRecoilState<UserStateType>(UserState);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      console.log(authUser?.uid)
      if (authUser) {
        const token = await authUser.getIdToken();
        setAuthToken(token);
        const user = await findOneUser()

        if (user) {
          setUser(user)
        }
      } else {
        router.push('/signIn');
      }
    });
    return () => unsub();
  }, []);

  return user;
};

//リファクタ
//今はmainでしか認証ができていないが認証に関連するコンポーネント単位でできるようにする。
