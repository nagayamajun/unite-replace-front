import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { UploadProduct } from "@/features/product/components/templates/UploadProduct"
import { ReactElement } from "react";


const UploadProductPage = () => <UploadProduct />

UploadProductPage.getLayout = (page: ReactElement) => {
  return ( <UserLayout>{ page }</UserLayout> )
}

export default UploadProductPage;
