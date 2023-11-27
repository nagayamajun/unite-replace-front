import { boolean } from "zod";

type ButtonType = 'submit' | 'button';

type Props = {
  innerText: string;
  type: ButtonType;
  disabled?: boolean;
  onClick?: any;
  buttonColor?: 'green' | 'red'
}

export const PlainButton = ({ innerText, type, disabled, onClick, buttonColor = 'green'}: Props): JSX.Element => {

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={` text-white text-sm w-full h-full p-1 rounded-md text-center ${disabled ? 'bg-gray-400': 'bg-plain-green'} ${buttonColor === 'red' && 'bg-plain-red'}`}>
      {innerText}
    </button>
  )
}