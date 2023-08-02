import { ProductList } from "@/features/product/components/organisms/List/AllProductList";
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { ReactElement } from "react";

const CorporationHome = () => {

  return (
    <div className="min-h-screen">
       <ProductList />
    </div>
  );
};

CorporationHome.getLayout = (page: ReactElement) => <EmployeeLayout>{page}</EmployeeLayout>;
export default CorporationHome;
