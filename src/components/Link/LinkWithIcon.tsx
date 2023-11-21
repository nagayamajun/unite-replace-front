import Link from "next/link"
import { ReactElement } from "react";

type Props = {
  link: string;
  labelText: string
  icon: ReactElement;
  bgColor: 'bg-plain-green' | 'bg-white';
  textColor: 'text-white' | 'text-black';
  isBorder: boolean
}
export const LinkWithIcon = ({ link, bgColor, labelText, icon, textColor, isBorder }: Props) => (
  <Link href={link} className={`flex items-center w-full px-1 py-2 rounded-md space-x-2 justify-center ${bgColor} ${textColor} ${isBorder && 'border border-gray-300'}`}>
    <div className="">{icon}</div>
    <p className="text-sm font-light">{labelText}</p>
  </Link>
)