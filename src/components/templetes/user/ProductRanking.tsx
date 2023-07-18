import { productRepository } from "@/modules/product/product.repository"
import { Product } from "@/types/product"
import { useEffect, useState } from "react"

export const ProductRanking = () => {
  const [topTenProducts, setTopTenProducts] = useState<Product[]>([])

  useEffect(() => {
    (async () => {
      const fetchedProducts = await productRepository.getTopTenProducts();
      setTopTenProducts(fetchedProducts)
    })()
  }, [])


  return (
    <div className="min-h-screen">
      <h1>ranking</h1>
      {topTenProducts.map((product) => {
        return (
          <section>
            <p>プロダクト名</p>
            <div>{product?.headline}</div>
          </section>
        )
      })}
    </div>
  )
}

// productのカラムを変更する為ここも変わるのでとりあえず表示までしています。
// デザインも考えなきゃ、、、