import { useEffect, useState } from "react";
import {
  Product,
  ProductWithApprovedUserRecruitParticipants,
} from "../types/product";
import { productRepository } from "../modules/product/product.repository";
import { useLoading } from "@/hooks/useLoading";

export const useProductWithApprovedUserRecruitParticipants = (
  productId: string
) => {
  const { showLoading, hideLoading } = useLoading();
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
