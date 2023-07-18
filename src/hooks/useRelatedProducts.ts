import { useEffect, useState } from "react"
import { Product } from "../types/product"
import { productRepository } from "@/modules/product/product.repository";

export const useRelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedProducts = await productRepository.getRelatedProduct();
      setRelatedProducts(fetchedProducts)
    })()
  }, [])

  return relatedProducts
}
