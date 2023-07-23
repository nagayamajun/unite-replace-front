import { ReactElement } from "react";
import { UserLayout } from "@/components/templetes/layouts/UserLayout"
import { ProductRanking } from "@/components/templetes/user/ProductRanking";

const ProductRankingPage = () => <ProductRanking />

ProductRankingPage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>
}

export default ProductRankingPage;