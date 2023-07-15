import { ProductList } from "@/components/organisms/ProductList";
import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";
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
