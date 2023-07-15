import { FAIL_TO_GET_GITHUB_USER } from "@/constants/constants";
import axios from "axios";

export const GithubUtils = {
  async getAuthenticatedUser(accessToken: string | undefined) {
    try {
      const user = (
        await axios.get("https://api.github.com/user", {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${accessToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
      ).data;

      return user;
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_GET_GITHUB_USER}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },
};
