import { useEffect, useState } from "react"
import { Product } from "../types/product"
import { productRepository } from "@/features/product/modules/product/product.repository";
import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const useProducts = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
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
