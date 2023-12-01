import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { UserStateType } from "@/infrastructures/frameworks/store";
import { useGlobalUser } from "@/adapters/globalState.adapter";
import { useAxios } from "@/adapters/axios.adapter";
import { useUser } from "@/adapters/user.adapter";
import { axiosInstance } from "@/libs/axios";

export const useAuthWithOutRequire = (): UserStateType => {
  const { user: userState, setUser } = useGlobalUser();
  const axiosService = useAxios();
  const userService = useUser();
  
  let user: UserStateType = userState;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser === null) {
        user = null;
        setUser(user);
        return
      }
      const token = await authUser.getIdToken();
      axiosService.setAuthToken(token);
      user = await userService.findByFirebaseUid();
      setUser(user);
    });
    return () => unsub();
  }, []);
  
  if (user && axiosInstance.defaults.headers.common["Authorization"]) {
    return user;
  } else {
    return null;
  }
};