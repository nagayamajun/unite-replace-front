import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { User } from "@/domein/user"

type Props = {
  user: User
}

export const UserInfo = ({user}: Props) => (
  <div className="flex items-center w-full space-x-4 bg-plain-gray p-6 rounded-md min-h-[120px]">
    <PersonIcon defaultIconSize={48} originalIconImageSrc={user.imageUrl} originalIconImageAlt="ユーザーのアイコン"/>
    <div className="flex flex-col space-y-1">
      <div>{user?.name}</div>
      <div>{user?.selfPublicity ?? 'よろしくお願いします。'}</div>
    </div>
  </div>
)