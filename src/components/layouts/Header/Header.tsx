import { PlainButton } from "@/components/Button/PlainButton"
import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { User } from "@/features/user/types/user"

type Props = {
  user: User
}

export const Header = (): JSX.Element => {

  return (
    <header className="border border-b py-2 px-10 md:px-20 flex">
      <h1 className="font-bold tracking-wider text-3xl w-1/2">UNITE</h1>
      <div className="flex w-1/2 space-x-4 md:space-x-8 items-center justify-end">
        <PersonIcon />
        <div className="w-28">
          <PlainButton
            innerText="募集"
            type="button"
          />
        </div>
      </div>
    </header>
  )
}