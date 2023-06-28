import { ProductRepositry } from "@/modules/product/product.repository";
import { useEffect, useState } from "react"
import { Product } from "../types/product"

export const useMyProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedProducts = await ProductRepositry.getMyProduct();
      setRelatedProducts(fetchedProducts)
    })()
  }, [])

  return relatedProducts
}
