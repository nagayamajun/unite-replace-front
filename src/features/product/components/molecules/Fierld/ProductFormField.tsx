import { Dispatch, MouseEventHandler } from "react";
import { AiFillEdit } from "react-icons/ai";

type FormFieldProps = {
  labelText?: string;
  input: string;
  editable?: boolean;
  onCLick: MouseEventHandler<HTMLButtonElement>;
};

export const ProductFormField = ({
  labelText,
  input,
  editable,
  onCLick,
}: FormFieldProps): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row w-full mb-3">
        <p className="w-1/2">{labelText}</p>
        <button
          onClick={onCLick}
          className={`w-1/2 flex items-end justify-end ${
            editable ? "" : "hidden"
          }`}
        >
          <AiFillEdit className="text-lg" />
        </button>
      </div>
      <div className="border rounded-md p-3 border-gray-300">{input}</div>
    </div>
  );
};
