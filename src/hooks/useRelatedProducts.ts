
import { ProductRepositry } from "@/modules/product/product.repository";
import { useEffect, useState } from "react"
import { Product } from "../types/product"

export const useRelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedProducts = await ProductRepositry.getRelatedProduct();
      setRelatedProducts(fetchedProducts)
    })()
  }, [])

  return relatedProducts
}
