import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product } from "@/features/product/types/product";
import { useEffect, useState } from "react"

export const useMyProducts = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const [ myProducts, setMyProducts ] =  useState<Product[]>();

  useEffect(() => {
    (async () => {
      showLoading();
      await productRepository.getMyProducts().then(res => setMyProducts(res));
      hideLoading();
    })()
  }, [])

  return {
    myProducts
  }
}