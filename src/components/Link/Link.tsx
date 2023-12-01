import Link from "next/link"

type Props = {
  link: string;
  labelText: string
  bgColor: 'bg-plain-green' | 'bg-white';
  textColor: 'text-white' | 'text-black';
  isBorder: boolean
}
export const PlainLink = ({ link, bgColor, labelText, textColor, isBorder }: Props) => (
  <Link href={link} className={`flex items-center w-full h-full px-1 py-2 rounded-md space-x-2 justify-center ${bgColor} ${textColor} ${isBorder && 'border border-gray-300'}`}>
    <p className="text-sm font-light">{labelText}</p>
  </Link>
)