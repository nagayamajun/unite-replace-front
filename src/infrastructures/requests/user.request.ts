import { axiosInstance } from "@/libs/axios";

export const userRequest = {
  async update(submitData: any) {
    const response = await axiosInstance.put("/user/update-by-firebase-uid", submitData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data
  },

  async findById(userId: string) {
    const response = await axiosInstance.get(`/user/find-by-id/${userId}`)
    return response.data;
  },

  async findUserByFirebaseUID() {
    const response = await axiosInstance.get("/user/find-by-firebase-uid");
    return response.data;
  },

  async signUpWithEmailAndPassword(email: string, password: string) {
    const response = await axiosInstance.post("/user", { email, password });
    const customToken = {
      token: response.data.token
    }
    return customToken;
  },

  async signInWithGoogle() {
    const response = await axiosInstance.post("/user/sign-in-with-google-or-github");
    return response.data;
  },
  
  async signInWithGithub(githubAccount: any) {
    const response = await axiosInstance.post('/user/sign-in-with-google-or-github', {
      githubAccount: githubAccount,
    })
    return response.data;
  },
}