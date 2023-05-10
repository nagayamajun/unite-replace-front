type SubmitButtonProps = {
  innerText: string;
};

export const SubmitButton = ({ innerText }: SubmitButtonProps): JSX.Element => {
  return (
    <button type="submit" className="bg-green-500 text-white rounded-md p-2 my-3 w-full">
      {innerText}
    </button>
  );
};
