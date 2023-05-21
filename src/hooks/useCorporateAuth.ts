import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { UserStateType } from "@/global-states/atoms";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { User } from "../types/user";
import { CorporationState, CorporationStateType } from "@/global-states/corporateAtom";
import { Corporation } from "../types/corporation";


export const useCorporateAuth = (): UserStateType => {
  const router = useRouter();
  const [corporation, setCorporation] = useRecoilState<CorporationStateType>(CorporationState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authCorporation) => {
      if (authCorporation) {
        const ref = doc(db, `corporations/${authCorporation.uid}`);
        const snap = await getDoc(ref);

        if(snap.exists()) {
          const appCorporation = (await getDoc(ref)).data() as Corporation;
          setCorporation(appCorporation);
        } else {
          const appCorporation: Corporation = {
            uid: authCorporation.uid,
          }

          setDoc(ref, appCorporation).then(() => {
            setCorporation(appCorporation)
          })
        }
      } else {
        // resetStatus();
        //Authコンポーネントにpush
        router.push('/corporation/corporateSignIn');
      }
    });
    return () => unsub();
  }, []);

  return corporation;
};
