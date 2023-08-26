import { ChatPage } from "@/features/chat/components/templates/Chat";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { ReactElement } from "react";

// TODO: UserとEmployeeでページを分ける　
const Chat = (): JSX.Element => <ChatPage />

Chat.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>
export default Chat;
