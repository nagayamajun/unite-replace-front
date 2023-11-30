import { auth } from "@/libs/firebase";
import { UserCredential, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const firebaseService = ({
  logOut: async () => await signOut(auth),
  signInWithEmailAndPassword: async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response
  },
  getIdToken: async (userCredential: UserCredential) => {
    const response = await userCredential.user.getIdToken();
    return response
  },
  signInWithCustomToken: async (token: string) => {
    const response = await signInWithCustomToken(auth, token);
    return response
  }
});

