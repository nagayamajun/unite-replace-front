import { UserState } from "@/stores/atoms"
import { productRepository } from "@/features/product/modules/product/product.repository"
import { Product } from "@/features/product/types/product"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { MyProductList } from "../organisms/List/MyProductList"
import { RelatedProductList } from "../organisms/List/RelatedProductList"
import { ReturnToHomeButton } from "@/components/molecules/Button/ReturnToHomeButton"

export const MyProductAndRelatedProduct = () => {
  const user = useRecoilValue(UserState);
  const [ myProducts, setMyProducts ] =  useState<Product[]>();
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      await productRepository.getMyProducts().then(res => setMyProducts(res));
      await productRepository.getRelatedProduct().then(res => setRelatedProducts(res));
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start h-screen space-y-10">
      {/* 自分で作成したProduct */}
      <MyProductList />
      {/* 関連したProduct */}
      <RelatedProductList />
      <ReturnToHomeButton />
    </div>
  )
}
