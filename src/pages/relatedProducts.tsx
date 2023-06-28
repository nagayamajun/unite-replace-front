import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { RelatedProducts } from "@/components/templetes/user/RelatedProducts";
import { ReactElement } from "react";

const RelatedProductsPage = () => {
  return (
    <>
      <RelatedProducts />
    </>
  )
}

RelatedProductsPage.getLayout = (page: ReactElement) => (
  <UserLayout> {page} </UserLayout>
);
export default RelatedProductsPage;
