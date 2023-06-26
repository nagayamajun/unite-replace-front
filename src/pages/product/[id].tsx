import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProduct } from "@/components/templetes/user/EditProduct";
import { ProductRepositry } from "@/modules/product/product.repository";
import { Product } from "@/types/product";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";


const EditProductPage = () => {

  return (
    <>
      <EditProduct />
    </>
  )
}

EditProductPage.getLayout = (page: ReactElement) => (
  <UserLayout>{ page }</UserLayout>
)

export default EditProductPage
