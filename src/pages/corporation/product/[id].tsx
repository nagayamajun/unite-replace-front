import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";
import { EditProduct, Path } from "@/components/templetes/user/EditProduct";
import { ReactElement } from "react";


const EditProductPage = () =>  <EditProduct path={Path.CorporationPath} />


EditProductPage.getLayout = (page: ReactElement) => (
  <EmployeeLayout>{ page }</EmployeeLayout>
)

export default EditProductPage


//EditProductは企業側(従業員)と学生で同じコンポーネントを使う予定だが条件で分けるようにする