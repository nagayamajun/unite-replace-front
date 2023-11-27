import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { Loading } from "@/components/organisms/Loading/Loading";
import { UserProfile } from "@/ui/user/profile/UserProfile";
import { UserState } from "@/stores/atoms";
import { EmployeeState } from "@/stores/employeeAtom";
import { useRecoilValue } from "recoil";

const UserProfilePage = (): JSX.Element => {
  const user = useRecoilValue(UserState);
  const employee = useRecoilValue(EmployeeState);

  switch (true) {
    case !!user:
      return (
        <UserLayout>
          <UserProfile />
        </UserLayout>
      );
    case !!employee:
      return (
        <EmployeeLayout>
          <UserProfile />
        </EmployeeLayout>
      );
    default:
      return <Loading />;
  }
};

export default UserProfilePage;
