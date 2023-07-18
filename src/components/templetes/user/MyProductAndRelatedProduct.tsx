import { UserState } from "@/global-states/atoms"
import { productRepository } from "@/modules/product/product.repository"
import { Product } from "@/types/product"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export const MyProductAndRelatedProduct = () => {
  const user = useRecoilValue(UserState);
  const [ myProducts, setMyProducts ] =  useState<Product[]>();
  const [ relatedProducts, setRelatedProducts ] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      await Promise.all([
        productRepository.getMyProducts().then((res) => {
          setMyProducts(res)
        }),
        productRepository.getRelatedProduct().then((res) => {
          setRelatedProducts(res)
        })
      ])
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start h-screen space-y-10">
      <div className="w-80 sm:w-base md:w-sm mt-10 sm:mt-20 p-5 bg-gray-100 sm:bg-white rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">自分の作成した作品一覧</h1>
        {myProducts?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          myProducts?.map((myProduct, index) => {
            //自分の作成したコメントがあるかをチェックする
            const hasComment = myProduct.comment?.some((comment) => comment.userId === user?.id);

            return (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-col items-center sm:flex-row">
                  <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{myProduct.headline}</p>
                  { hasComment ? (
                    <p className="mb-2 sm:mb-0 text-sm sm:text-base">comment登録済み</p>
                  ) : (
                    <p className="text-red-400 text-sm mb-2 sm:mb-0 sm:text-base">commentを追加してください</p>
                  )
                  }
                </div>
                <div className="flex justify-end">
                  <Link href={`/product/${myProduct?.id}`} className="flex text-red-600 text-sm sm:text-base">
                    詳細へ
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 関連する方 */}
      <div className="w-80 sm:w-sm mt-10 sm:mt-20 p-5 bg-gray-100 sm:bg-white rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">参加した作品一覧</h1>
        {relatedProducts?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          relatedProducts?.map((relatedProduct, index) => {
            //自分の作成したコメントがあるかをチェックする
            const hasComment = relatedProduct.comment?.some((comment) => comment.userId === user?.id);

            return (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-col items-center sm:flex-row">
                  <p className="font-semibold mr-10">{relatedProduct.headline}</p>
                  { hasComment ? (
                    <p className="mb-2 sm:mb-0 text-sm sm:text-base">comment登録済み</p>
                  ) : (
                    <p className="text-red-400 text-sm mb-2 sm:mb-0 sm:text-base">commentを追加してください</p>
                  )
                  }
                </div>
                <div className="flex justify-end">
                  <Link href={`/product/${relatedProduct.id}`} className="flex text-red-600 text-sm sm:text-base">
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
