import { UserState } from "@/global-states/atoms"
import { ProductRepositry } from "@/modules/product/product.repository"
import { Product } from "@/types/product"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export const MyProductAndRelatedProduct = () => {
  const user = useRecoilValue(UserState);
  const [ myProducts, setProducts ] =  useState<Product[]>();
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const fetchedMyProducts = await ProductRepositry.getMyProducts()
      setProducts(fetchedMyProducts)
      const fetchedrelatedProducts = await ProductRepositry.getRelatedProduct()
      setRelatedProducts(fetchedMyProducts);
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-3/5 mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">自分の作成したProduct一覧</h1>
        {myProducts?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          myProducts?.map((myProduct) => {
            const hasCommnet = myProduct.comment?.some((comment) => comment.userId === user?.id);
            return (
              <div className="flex flex-row justify-between p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-row">
                  <p className="font-semibold mr-10">{myProduct.headline}</p>
                  { hasCommnet ? (
                    <p className="text-red-400 text-sm">comment登録済み</p>
                  ) : (
                    <p className="text-red-400 text-sm">commentを追加してください</p>
                  )
                  }
                </div>
                <div>
                  <Link href={`/product/${myProduct?.id}`} className="text-red-600">
                    詳細へ
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 関連する方 */}
      <div className="w-3/5 mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">関連したProduct一覧</h1>
        {relatedProducts?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          relatedProducts?.map((relatedProduct) => {
            const hasCommnet = relatedProduct.comment?.some((comment) => comment.userId === user?.id);
            return (
              <div className="flex flex-row justify-between p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-row">
                  <p className="font-semibold mr-10">{relatedProduct.headline}</p>
                  { hasCommnet ? (
                    <p className="text-red-400 text-sm">comment登録済み</p>
                  ) : (
                    <p className="text-red-400 text-sm">commentを追加してください</p>
                  )
                  }
                </div>
                <div>
                  <Link href={`/product/`} className="text-red-600">
                    詳細へ
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center items-center mt-10 w-1/2">
        <Link href="/homeScreen" className="rounded-md px-16 py-3 bg-green-500 hover:bg-green-600 text-white">戻る</Link>
      </div>
    </div>
  )
}
