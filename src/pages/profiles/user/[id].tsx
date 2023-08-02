import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { UserProfile } from "@/features/user/components/templates/UserProfile";
import { ReactElement } from "react";

const UserProfilePage = (): JSX.Element => <UserProfile />;

UserProfilePage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default UserProfilePage;
