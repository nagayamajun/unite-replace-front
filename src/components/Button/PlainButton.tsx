type ButtonType = 'submit' | 'button';

type Props = {
  innerText: string;
  type: ButtonType;
  disabled?: boolean;
}

export const PlainButton = ({ innerText, type, disabled }: Props): JSX.Element => (
  <button type={type} disabled={disabled} className='bg-plain-green w-full p-1 rounded-md text-center  text-white'>
    {innerText}
  </button>
)