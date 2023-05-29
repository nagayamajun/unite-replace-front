import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { EditProfile } from "@/components/templetes/user/EditProfile";
import { ReactElement } from "react";

const EditProfilePage = (): JSX.Element => <EditProfile />;

EditProfilePage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default EditProfilePage;
