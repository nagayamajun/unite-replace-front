import { FirebaseService } from "@/application/ports/firebaseService";
import { firebaseService } from "@/infrastructures/frameworks/firebase";

export const useFirebase = (): FirebaseService => {
  return {
    logOut() {
        return firebaseService.logOut()
    },
    signInWithEmailAndPassword(email, password) {
        return firebaseService.signInWithEmailAndPassword(email, password)
    },
    getIdToken(userCredential) {
        return firebaseService.getIdToken(userCredential)
    },
    signInWithCustomToken(token) {
        return firebaseService.signInWithCustomToken(token);
    },
  }
}