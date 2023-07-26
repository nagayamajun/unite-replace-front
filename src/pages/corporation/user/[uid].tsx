import { UserDetailPage } from "@/features/user/components/templates/UserDetail";
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { ReactElement } from "react";

const UserDetail = (): JSX.Element => <UserDetailPage />

UserDetail.getLayout = function getLayout(page: ReactElement) {
  return <EmployeeLayout>{page}</EmployeeLayout>
}
export default UserDetail;
