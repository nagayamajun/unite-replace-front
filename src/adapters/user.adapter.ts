import { UserService } from "@/application/ports/userService";
import { userRequest } from "@/infrastructures/requests/user.request";

export const useUser = (): UserService => {
  return {
    update(submitData) {
      return userRequest.update(submitData);
    },
    findById(userId) {
      return userRequest.findById(userId);
    },
    findByFirebaseUid() {
      return userRequest.findUserByFirebaseUID();
    },
    signUpWithEmailAndPassword(email, password) {
        return userRequest.signUpWithEmailAndPassword(email, password);
    },
    signInWithGithub(githubAccount) {
        return userRequest.signInWithGithub(githubAccount);
    },
    signInWithGoogle() {
        return userRequest.signInWithGoogle();
    },
  };
};