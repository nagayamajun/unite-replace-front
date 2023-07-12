import { UserDetailPage } from "@/components/templetes/corporation/UserDetail";
import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";
import { ReactElement } from "react";

const UserDetail = (): JSX.Element => <UserDetailPage />

UserDetail.getLayout = function getLayout(page: ReactElement) {
  return <EmployeeLayout>{page}</EmployeeLayout>
}
export default UserDetail;
