type SubmitButtonProps = {
  innerText: string;
  disabled?: boolean;
};

export const SubmitButton = ({ innerText, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <button type="submit" disabled={disabled} className="bg-green-500 text-white rounded-md p-2 my-3 w-full">
      {innerText}
    </button>
  );
};
