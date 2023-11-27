import { User } from "@/domein/user";

export interface UserService {
  update(submitData: any): Promise<User>;
  findById(userId: string): Promise<User>;
  findByFirebaseUid(): Promise<User>;
  signUpWithEmailAndPassword(email: string, password: string): Promise<{token: any}>;
  signInWithGoogle(): Promise<any>;
  signInWithGithub(githubAccount: any): Promise<any>;
}