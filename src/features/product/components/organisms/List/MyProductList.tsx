import { useGlobalUser } from "@/adapters/globalState.adapter";
import { useMyProducts } from "@/features/product/hooks/useMyProducts"
import Link from "next/link";

export const MyProductList = (): JSX.Element => {
  const { user } = useGlobalUser();
  const { myProducts } = useMyProducts();

  return (
    <div className="flex flex-col w-80 sm:w-sm md:w-md mt-10 sm:mt-20 p-5 sm:bg-white rounded-lg shadow-md">
      <h1 className="text-center mb-5 font-bold text-lg">自分の作成した作品一覧</h1>
      {myProducts?.length === 0 ? (
        <p className="text-center font-bold text-red-400">まだ作成していません。</p>
      ) : (
        myProducts?.map((myProduct, index) => {
          //自分の作成したコメントがあるかをチェックする
          const hasComment = myProduct.comment?.some((comment) => comment.userId === user?.id);

          return (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
              <div className="flex flex-col items-center sm:flex-row">
                <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{myProduct.name}</p>
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
  )

}