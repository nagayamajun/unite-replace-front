import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { UploadProduct } from "@/components/templetes/user/UploadProduct"
import { ReactElement } from "react";


const UploadProductPage = () => {
   return (
      <>
         <UploadProduct />
      </>
   )
}

UploadProductPage.getLayout = (page: ReactElement) => {
  return ( <UserLayout>{ page }</UserLayout> )
}

export default UploadProductPage;
