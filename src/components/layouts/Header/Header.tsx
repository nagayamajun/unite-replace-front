import { PlainButton } from "@/components/Button/PlainButton"
import { LinkWithIcon } from "@/components/Link/LinkWithIcon"
import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { User } from "@/domein/user"
import Link from "next/link"
import { useRouter } from "next/router"
import { GrAddCircle } from 'react-icons/gr'

type Props = {
  user: User
}

export const Header = ({ user }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <header className="border border-b py-2 px-10 md:px-20 flex">
      <h1 className="font-bold tracking-wider text-3xl w-1/2"><Link href='/homeScreen'>UNITE</Link></h1>
      <div className="flex w-1/2 space-x-4 md:space-x-8 items-center justify-end">
        <PersonIcon 
          onClick={() => router.push(`/profiles/user/${user.id}`)}
        />
        <div className="w-24">
          <LinkWithIcon
            labelText="募集"
            icon={<GrAddCircle size={16} color="white" />}
            link={'/recruit/addRecruit'}
            bgColor="bg-plain-green"
            textColor="text-white"
            isBorder={false}
          />
        </div>
      </div>
    </header>
  )
}