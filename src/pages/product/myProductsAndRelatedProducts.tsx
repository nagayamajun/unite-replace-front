import { UserLayout } from "@/components/layouts/Layout/UserLayout"
import { MyProductAndRelatedProduct } from "@/features/product/components/templates/MyProductAndRelatedProduct"
import { ReactElement } from "react"

const MyProductsAndRelatedProductsPage = () => {

  return (
    <>
      <MyProductAndRelatedProduct />
    </>
  )
}

MyProductsAndRelatedProductsPage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>
}

export default MyProductsAndRelatedProductsPage
