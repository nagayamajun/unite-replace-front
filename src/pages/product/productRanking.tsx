import { ReactElement } from "react";
import { UserLayout } from "@/components/layouts/Layout/UserLayout"
import { ProductRanking } from "@/features/ranking/components/templates/ProductRanking";

const ProductRankingPage = () => <ProductRanking />

ProductRankingPage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>
}

export default ProductRankingPage;