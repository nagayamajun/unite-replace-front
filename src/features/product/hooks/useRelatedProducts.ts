import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product } from "@/features/product/types/product";
import { useEffect, useState } from "react";

export const useRelatedProducts = () => {
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      await productRepository.getRelatedProduct().then(res => setRelatedProducts(res));
    })()
  }, [])

  return {
    relatedProducts
  }
}