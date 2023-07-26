import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { EditProduct } from "@/features/product/components/templates/EditProduct";
import { PathToProductPage } from "@/features/product/types/product";
import { ReactElement } from "react";


const EditProductPage = () =>  <EditProduct path={PathToProductPage.CorporationPath} />


EditProductPage.getLayout = (page: ReactElement) => (
  <EmployeeLayout>{ page }</EmployeeLayout>
)

export default EditProductPage


//EditProductは企業側(従業員)と学生で同じコンポーネントを使う予定だが条件で分けるようにする