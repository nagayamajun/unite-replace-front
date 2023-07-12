import { ProductList } from "@/components/organisms/ProductList"
import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";

import { ReactNode } from "react";

const productList = () => <ProductList />


productList.getLayout = function getLayout(page: ReactNode) {
  return <EmployeeLayout>{page}</EmployeeLayout>
}
export default productList;
