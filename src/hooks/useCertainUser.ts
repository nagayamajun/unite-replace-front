import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useEffect, useState } from "react";
import { User } from "../features/user/types/user";

export const useCertainUser = (userId: string) => {
  const [certainUser, setCertainUser] = useState<User>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async () => {
      await UserRepository.findUserById(userId)
        .then((user) => setCertainUser(user))
        .catch((error) => setError(error));
    })();
  }, []);

  return { certainUser, setCertainUser, error };
};
