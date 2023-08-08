import { ChatPage } from "@/features/chat/components/templates/Chat";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { UserState, UserStateType } from "@/stores/atoms";
import { useRecoilValue } from "recoil";
import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom";
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { Loading } from "@/components/organisms/Loading/Loading";

const Chat = (): JSX.Element => {
  const user = useRecoilValue<UserStateType>(UserState);
  const employee = useRecoilValue<EmployeeStateType>(EmployeeState);

  switch (true) {
    case !!user:
      return (
        <UserLayout>
          <ChatPage />
        </UserLayout>
      );
    case !!employee:
      return (
        <EmployeeLayout>
          <ChatPage />
        </EmployeeLayout>
      );
    default:
      return <Loading />;
  }
};

export default Chat;
