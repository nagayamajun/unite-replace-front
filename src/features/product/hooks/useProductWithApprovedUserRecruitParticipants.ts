import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant";
import { useEffect, useState } from "react";
import {
  Product,
  ProductWithApprovedUserRecruitParticipants,
} from "../types/product";
import { productRepository } from "../modules/product/product.repository";

export const useProductWithApprovedUserRecruitParticipants = (
  productId: string
) => {
  const [product, setProduct] =
    useState<ProductWithApprovedUserRecruitParticipants>();

  useEffect(() => {
    (async () => {
      await productRepository
        .getProductWithApprovedUserRecruitParticipantsById(productId)
        .then((resProduct) => {
          setProduct(resProduct);
        });
    })();
  }, []);

  return { product };
};
