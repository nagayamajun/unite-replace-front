import { EmployeeLayout } from "@/components/layouts/Layout/EmployeeLayout"
import { ChatPage } from "@/features/chat/components/templates/Chat"
import { ReactElement } from "react"

//TODO: userの動線を使う時にpathをこちらにむける。
const EmployeeChat = () => (
  <div className="justify-between">
    <ChatPage />
  </div>
)

EmployeeChat.getLayout = (page: ReactElement) => <EmployeeLayout>{page}</EmployeeLayout>