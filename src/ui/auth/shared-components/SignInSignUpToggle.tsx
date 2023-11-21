import Link from "next/link";

type Props = {
  innerText: string;
  path: string;
  toggleText: '新規登録' | 'ログイン'
}

export const SignInSignUpToggle = ({ innerText, path, toggleText }: Props) => (
  <div className="flex justify-center">
    <p className="text-sm sm:text-base">{innerText}&nbsp;</p>
    <Link href={path} className="font-bold">
      {toggleText}
    </Link>
  </div>
)