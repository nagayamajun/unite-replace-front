import { useEffect, useState } from "react";
import { Corporation } from "../types/corporation";
import { CorporationRepository } from "../modules/corporation/corporation.repository";

export const useCertainCorporation = (corporationId?: string) => {
  const [certainCorporation, setCertainCorporation] = useState<Corporation>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!corporationId) return;
    (async () => {
      await CorporationRepository.getById(corporationId)
        .then((corporation) => {
          setCertainCorporation(corporation);
        })
        .catch((error) => setError(error));
    })();
  }, [corporationId]);

  return { certainCorporation, setCertainCorporation, error };
};
