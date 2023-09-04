import { useEffect, useState } from "react"
import { Product } from "../types/product"
import { productRepository } from "@/features/product/modules/product/product.repository";
import { useLoading } from "@/hooks/useLoading";

export const useProducts = () => {
  const { showLoading, hideLoading } = useLoading();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      showLoading();
      const fetchedProducts = await productRepository.getAllProducts();
      setProducts(fetchedProducts);
      hideLoading();
    })()
  }, [])
  return { products }
}
