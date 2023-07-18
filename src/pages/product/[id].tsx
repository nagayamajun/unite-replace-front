import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProduct, Path } from "@/components/templetes/user/EditProduct";
import { ReactElement } from "react";


const EditProductPage = () => <EditProduct path={Path.UserPath} />

EditProductPage.getLayout = (page: ReactElement) => (
  <UserLayout>{ page }</UserLayout>
)

export default EditProductPage
