import { ChatPage } from "@/components/templetes/common/chat/Chat";
import { EmployeeLayout } from "@/components/templetes/layouts/EmployeeLayout";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

const ScoutingChat = (): JSX.Element => <ChatPage />;

ScoutingChat.getLayout = function getLayout(page: ReactNode) {
  return <EmployeeLayout>{page}</EmployeeLayout>;
};

export default ScoutingChat;
