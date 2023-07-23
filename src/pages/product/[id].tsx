import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProduct } from "@/components/templetes/user/EditProduct";
import { PathToProductPage } from "@/types/product";
import { ReactElement } from "react";


const EditProductPage = () => <EditProduct path={PathToProductPage.UserPath} />

EditProductPage.getLayout = (page: ReactElement) => (
  <UserLayout>{ page }</UserLayout>
)

export default EditProductPage
