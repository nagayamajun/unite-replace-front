import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "@/global-states/atoms";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/global-states/atoms";
import { UserRepository } from "@/modules/user/user.repository";
import { axiosInstance, setAuthToken } from "@/libs/axios";


export const useAuth = (): UserStateType => {
  const router = useRouter();
  const [user, setUser ] = useRecoilState<UserStateType>(UserState);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      console.log(authUser?.uid)
      if (authUser) {
        const token = await authUser.getIdToken();
        console.log(`token ${token}`)
        setAuthToken(token);
        // console.log(`settoken${axiosInstance.defaults.headers.common["Authorization"]}`)
        const user = await UserRepository.findUserByFirebaseUID();
        user ? console.log(user) : console.log("undefind")

        if (user) {
          setUser(user)
        }
      } else {
        router.push('/signIn');
      }
    });
    return () => unsub();
  }, []);

  console.log(user)
  return user;
};

//リファクタ
//contextの形で認証が必要なページを囲う
