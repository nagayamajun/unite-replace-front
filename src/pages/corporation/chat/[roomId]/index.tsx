import { ChatPage } from "@/components/templetes/common/chat/Chat";
import { CorporateLayout } from "@/components/templetes/layouts/CorporateLayout";
import { CorporationState } from "@/global-states/corporateAtom";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

const ScoutingChat = (): JSX.Element => <ChatPage />;

ScoutingChat.getLayout = function getLayout(page: ReactNode) {
  return <CorporateLayout>{page}</CorporateLayout>;
};

export default ScoutingChat;
