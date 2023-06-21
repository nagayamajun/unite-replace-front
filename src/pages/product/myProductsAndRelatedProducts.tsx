import { UserLayout } from "@/components/templetes/layouts/UserLayout"
import { MyProductAndRelatedProduct } from "@/components/templetes/user/MyProductAndRelatedProduct"
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
