import { ProductRepositry } from "@/modules/product/product.repository";
import { useEffect, useState } from "react"
import { Product } from "../types/product"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedProducts = await ProductRepositry.getAllProducts();
      setProducts(fetchedProducts)
    })()
  }, [])

  return { products }
}
