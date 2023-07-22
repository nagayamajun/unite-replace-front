import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";
import { EditProduct } from "@/components/templetes/user/EditProduct";
import { PathToProductPage } from "@/types/product";
import { ReactElement } from "react";


const EditProductPage = () =>  <EditProduct path={PathToProductPage.CorporationPath} />


EditProductPage.getLayout = (page: ReactElement) => (
  <EmployeeLayout>{ page }</EmployeeLayout>
)

export default EditProductPage


//EditProductは企業側(従業員)と学生で同じコンポーネントを使う予定だが条件で分けるようにする