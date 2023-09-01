import { MyProductList } from "../organisms/List/MyProductList"
import { RelatedProductList } from "../organisms/List/RelatedProductList"
import { ReturnToHomeButton } from "@/components/molecules/Button/ReturnToHomeButton"

export const MyProductAndRelatedProduct = () => (
  <div className="flex flex-col items-center w-full h-screen space-y-10">
    {/* 自分で作成したProduct */}
    <MyProductList />
    {/* 関連したProduct */}
    <RelatedProductList />
    <ReturnToHomeButton />
  </div>
)
