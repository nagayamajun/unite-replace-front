import { ChatPage } from "@/features/chat/components/templates/Chat";
import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

const ScoutingChat = (): JSX.Element => <ChatPage />;

ScoutingChat.getLayout = function getLayout(page: ReactNode) {
  return <EmployeeLayout>{page}</EmployeeLayout>;
};

export default ScoutingChat;
