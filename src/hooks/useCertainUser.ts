import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useEffect, useState } from "react";
import { User } from "../features/user/types/user";

export const useCertainUser = (userId: string | undefined) => {
  const [certainUser, setCertainUser] = useState<User>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      await UserRepository.findUserById(userId)
        .then((user) => setCertainUser(user))
        .catch((error) => setError(error));
    })();
  }, [userId]);

  return { certainUser, setCertainUser, error };
};
