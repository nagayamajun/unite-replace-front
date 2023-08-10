import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product } from "@/features/product/types/product";
import { useEffect, useState } from "react";


export const useTopTenProducts = () => {
  const [topTenProducts, setTopTenProducts] = useState<Product[]>([])

  useEffect(() => {
    (async () => {
      const fetchedProducts = await productRepository.getTopTenProducts();
      setTopTenProducts(fetchedProducts)
    })()
  }, [])

  return { topTenProducts }
}