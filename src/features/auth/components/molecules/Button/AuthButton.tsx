import { ReactNode } from "react";

type Props = {
  onClick: () => Promise<void | boolean>;
  children: ReactNode;
  src: string;

};

export const AuthButton: React.FC<Props> = ({onClick, children, src}): JSX.Element => {

  return (
    <div className="flex items-center justify-center h-12 sm:h-14 mt-1 rounded-xl font-bold mb-5 text-center border border-gray-400">
      <img src={src} className="w-6 h-6 inline-block"/>
      <button onClick={onClick} className="ml-3">{children}</button>
    </div>
  )
}
