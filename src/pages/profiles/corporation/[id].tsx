import { useGlobalUser } from "@/adapters/globalState.adapter";
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { Loading } from "@/components/organisms/Loading/Loading";
import { CorporationProfile } from "@/features/corporation/components/templates/CorporationProfile";
import { EmployeeState } from "@/stores/employeeAtom";
import { useRecoilValue } from "recoil";

const CorporationProfilePage = (): JSX.Element => {
  const { user } = useGlobalUser();
  const employee = useRecoilValue(EmployeeState);

  switch (true) {
    case !!user:
      return (
        <UserLayout>
          <CorporationProfile />
        </UserLayout>
      );
    case !!employee:
      return (
        <EmployeeLayout>
          <CorporationProfile />
        </EmployeeLayout>
      );
    default:
      return <Loading />;
  }
};

export default CorporationProfilePage;
