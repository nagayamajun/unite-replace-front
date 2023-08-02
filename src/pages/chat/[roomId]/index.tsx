import { ChatPage } from "@/features/chat/components/templates/Chat";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { UserState } from "@/stores/atoms";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";

const Chat = (): JSX.Element => <ChatPage />;

Chat.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default Chat;
