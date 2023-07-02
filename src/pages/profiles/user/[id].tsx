import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { UserProfile } from "@/components/templetes/user/UserProfile";
import { ReactElement } from "react";

const UserProfilePage = (): JSX.Element => <UserProfile />;

UserProfilePage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserProfilePage;
