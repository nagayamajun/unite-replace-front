import { ProductList } from "@/features/product/components/organisms/List/AllProductList"
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";

import { ReactNode } from "react";

const productList = () => <ProductList />


productList.getLayout = function getLayout(page: ReactNode) {
  return <EmployeeLayout>{page}</EmployeeLayout>
}
export default productList;
