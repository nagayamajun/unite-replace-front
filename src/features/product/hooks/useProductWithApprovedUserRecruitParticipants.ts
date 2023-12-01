import { useEffect, useState } from "react";
import {
  ProductWithApprovedUserRecruitParticipants,
} from "../types/product";
import { productRepository } from "../modules/product/product.repository";
import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const useProductWithApprovedUserRecruitParticipants = (
  productId: string
) => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const [product, setProduct] =
    useState<ProductWithApprovedUserRecruitParticipants>();

  useEffect(() => {
    (async () => {
      showLoading();
      await productRepository
        .getProductWithApprovedUserRecruitParticipantsById(productId)
        .then((resProduct) => {
          setProduct(resProduct);
        });
      hideLoading();
    })();
  }, []);

  return { product };
};
