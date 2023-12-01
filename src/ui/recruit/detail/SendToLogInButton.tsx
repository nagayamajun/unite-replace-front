import { PlainLink } from "@/components/Link/Link";

export const SendToLogInButton = (): JSX.Element => (
  <div className="flex w-full">
    <div className="w-196 h-14 mr-6">
      <PlainLink
        labelText="ログイン"
        link="/signIn"
        bgColor="bg-plain-green"
        textColor="text-white"
        isBorder={false}
      />
    </div>
    <strong className="text-plain-red text-xs m-auto">*参加申請やチャット,いいね機能はログイン後使用可能です。</strong>
  </div>
)