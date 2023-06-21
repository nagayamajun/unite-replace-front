import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProduct } from "@/components/templetes/user/EditProduct";
import { ProductRepositry } from "@/modules/product/product.repository";
import { Product } from "@/types/product";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";

type Props = {
  product: Product
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { id } = params as Params;
  const product = await ProductRepositry.getProductById(id)

  return {
    props: {
      product
    }
  }
}

const EditProductPage = ({ product }: Props) => {

  return (
    <>
      <EditProduct product={product} />
    </>
  )
}

EditProductPage.getLayout = (page: ReactElement) => (
  <UserLayout>{ page }</UserLayout>
)

export default EditProductPage
