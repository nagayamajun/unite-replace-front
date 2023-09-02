import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product } from "@/features/product/types/product";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useRelatedProducts = () => {
  const { showLoading, hideLoading } = useLoading();
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      showLoading();
      await productRepository.getRelatedProduct().then(res => setRelatedProducts(res));
      hideLoading();
    })()
  }, [])

  return {
    relatedProducts
  }
}