import { UserCredential } from "firebase/auth";

export interface FirebaseService {
  logOut: () =>  Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  getIdToken: (userCredential: UserCredential) => Promise<string>;
  signInWithCustomToken: (token: string) => Promise<UserCredential>
};