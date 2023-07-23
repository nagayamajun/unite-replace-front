import { useEffect, useState } from "react"
import { Product } from "../types/product"
import { productRepository } from "@/modules/product/product.repository";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedProducts = await productRepository.getAllProducts();
      setProducts(fetchedProducts)
    })()
  }, [])

  return { products }
}
