import { useEffect, useState } from "react";
import { Corporation } from "../types/corporation";
import { CorporationRepository } from "../modules/corporation/corporation.repository";
import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const useCertainCorporation = (corporationId?: string) => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const [certainCorporation, setCertainCorporation] = useState<Corporation>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!corporationId) return;
    (async () => {
      showLoading();
      await CorporationRepository.getById(corporationId)
        .then((corporation) => {
          setCertainCorporation(corporation);
        })
        .catch((error) => setError(error));
        hideLoading();
    })();
  }, [corporationId]);

  return { certainCorporation, setCertainCorporation, error };
};
