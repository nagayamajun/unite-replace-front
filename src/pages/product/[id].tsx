import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { EditProduct } from "@/features/product/components/templates/EditProduct";
import { PathToProductPage } from "@/features/product/types/product";
import { ReactElement } from "react";


const EditProductPage = () => <EditProduct path={PathToProductPage.UserPath} />

EditProductPage.getLayout = (page: ReactElement) => (
  <UserLayout>{ page }</UserLayout>
)

export default EditProductPage
