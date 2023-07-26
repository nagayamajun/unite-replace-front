import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product } from "@/features/product/types/product";
import { useEffect, useState } from "react"

export const useMyProducts = () => {
  const [ myProducts, setMyProducts ] =  useState<Product[]>();

  useEffect(() => {
    (async () => {
      await productRepository.getMyProducts().then(res => setMyProducts(res));
    })()
  }, [])

  return {
    myProducts
  }
}