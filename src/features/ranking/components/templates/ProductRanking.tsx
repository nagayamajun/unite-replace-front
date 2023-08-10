import { productRepository } from "@/features/product/modules/product/product.repository"
import { Product } from "@/features/product/types/product"
import { useEffect, useState } from "react"
import { useTopTenProducts } from "../../hooks/useTopTenProducts"
import { Loading } from "@/components/organisms/Loading/Loading"
import { TopThreeProducts } from "../organisms/TopThreeProduct"

export const ProductRanking = () => {
  const { topTenProducts } = useTopTenProducts();

  //上位3つを取得する
  const topThreeProducts = topTenProducts.slice(0, 3);

  if (!topTenProducts) return <Loading />

  return (
    <div className="min-h-screen w-full">
      <h1>ranking</h1>
      <TopThreeProducts products={topThreeProducts} />
      {topTenProducts.map((product) => {
        return (
          <section key={product.id}>
            <p>プロダクト名</p>
            <div>{product?.name}</div>
          </section>
        )
      })}
    </div>
  )
}

// productのカラムを変更する為ここも変わるのでとりあえず表示までしています。
// デザインも考えなきゃ、、、