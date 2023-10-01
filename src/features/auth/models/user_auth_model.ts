import { userAuthRepository } from "../repositories/user_auth_repository";
import { AuthWithEmailAndPassword, Token } from "../types/auth";

export const UserAuthFactory = (req?: any) => {
  const repository = req ?? userAuthRepository;
  return {
    signUp: async(params: AuthWithEmailAndPassword): Promise<Token> => {
      const response = await repository.signUpWithEmailAndPassword(params);
      return response
    },

    signInWithGoogle:async (): Promise<any> => {
      const response = await repository.signInWithGoogle();
      return response
    },

    signInWithGithub:async (githubAccount: any) => {
      const response = repository.signInWithGithub(githubAccount);
      return response
    }
    
  }
}