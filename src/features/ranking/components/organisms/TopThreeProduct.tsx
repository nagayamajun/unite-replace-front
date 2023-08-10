import { Product } from "@/features/product/types/product"

type Props = {
  products: Product[]
}

export const TopThreeProducts = ({ products }: Props): JSX.Element => {

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col bg-white w-[400px] h-60 rounded-md shadow-sm">
        <p className="font-semibold">1位</p>
        <div className="flex flex-col">
          <section>
            <p>プロダクト名</p>
            <p>{products[0].name}</p>
            
          </section>
        </div>
      </div>
    </div>
  )
}