import { useTopTenPeriodLikeSums } from "../../hooks/useTopTenProducts"
import { Loading } from "@/components/organisms/Loading/Loading"
import { TopProduct } from "../organisms/TopProduct"
import { ProductCard } from "@/features/product/components/organisms/Card/ProductCard"
import { PeriodLikeSum } from "../../types/PeriodlLikeSum"

export const ProductRanking = () => {
  const { topTenPeriodLikeSums } = useTopTenPeriodLikeSums();

  if (!topTenPeriodLikeSums) return <Loading />
  //1位を取得する
  const topPeriodLikeSums = topTenPeriodLikeSums[0];

  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-10">
      <h1 className="font-bold text-3xl my-10">ranking(毎日2回更新🔥)</h1>
      <TopProduct periodLikeSum={topPeriodLikeSums} />
      <div className="grid w-4/5 mx-10 gap-x-5 gap-y-8 sm:grid-cols-1 md:grid-cols-2  mt-5">
        {topTenPeriodLikeSums.map((periodLikeSum: PeriodLikeSum) => {
          return (
            <div>
              <p>いいね数 {periodLikeSum.likesCount}</p>
              <ProductCard
                key={periodLikeSum.id}
                id={periodLikeSum.id}
                name={periodLikeSum.product.name}
                recruit={periodLikeSum.product.recruit}
                skills={periodLikeSum.product.skills}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}