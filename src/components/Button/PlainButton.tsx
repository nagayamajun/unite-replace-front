type ButtonType = 'submit' | 'button';

type Props = {
  innerText: string;
  type: ButtonType;
  disabled?: boolean;
}

export const PlainButton = ({ innerText, type, disabled }: Props): JSX.Element => (
  <button type={type} disabled={disabled} className={`${disabled ? 'bg-gray-400': 'bg-green-500'} w-full h-10 sm:h-14 p-1 rounded-md font-bold mb-3 text-center sm:text-base text-sm  text-white`}>
    {innerText}
  </button>
)