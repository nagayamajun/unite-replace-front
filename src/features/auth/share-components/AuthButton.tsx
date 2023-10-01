import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  onClick: () => Promise<void | boolean>;
  children: ReactNode;
  src: string;

};

export const AuthButton: React.FC<Props> = ({onClick, children, src}): JSX.Element => {

  return (
    <div className="flex items-center justify-center h-12 sm:h-14 mt-1 rounded-xl font-bold mb-5 text-center border border-gray-400">

      <button onClick={onClick} className="ml-3 w-full ">
        <Image src={src} width={24} height={24} alt="ロゴ"  className="w-6 h-6 inline-block mr-2"/>
        {children}
      </button>
    </div>
  )
}
