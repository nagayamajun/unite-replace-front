import { useMyProducts } from "@/hooks/useMyProducts";
import { useRelatedProducts } from "@/hooks/useRelatedProducts"
import { ProductRepositry } from "@/modules/product/product.repository";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react"

export const RelatedProducts = (): JSX.Element => {

  // const relatedProducts = useRelatedProducts();
  // const myProducts = useMyProducts();
  const [ myProducts, setMyProduct ] = useState<Product[]>()
  useEffect(() => {
    (async () => {
      const myProduct = await ProductRepositry.getMyProduct();
      setMyProduct(myProduct)
    })()
  }, [])

  return (
    <div>

      { myProducts && myProducts?.map(product => {
         return <img src={product.url} alt="gazou"/>
      })}
      {/* {!relatedProducts && <p>あなたに関連するProductはありません</p>}
      { relatedProducts && relatedProducts?.map((product) => {
        return <p>{product.headline}</p>
      }) } */}
    </div>
  )
}
