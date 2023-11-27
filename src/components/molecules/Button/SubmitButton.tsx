type SubmitButtonProps = {
  innerText: string;
  disabled?: boolean;
};

export const SubmitButton = ({ innerText, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <button type="submit" disabled={disabled} className="bg-plain-green text-white rounded-md p-2 w-full">
      {innerText}
    </button>
  );
};
