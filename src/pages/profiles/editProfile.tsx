import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProfile } from "@/components/templetes/user/EditProfile";
import { ReactNode } from "react";

const EditProfilePage = (): JSX.Element => {
  return (
    <>
      <EditProfile/>
    </>
  );
};

EditProfilePage.getLayout = function getLayout(page: ReactNode) {
  return <UserLayout>{page}</UserLayout>
}
export default EditProfilePage;
