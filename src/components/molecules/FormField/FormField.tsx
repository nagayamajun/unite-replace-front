import { MouseEventHandler, ReactElement } from "react";
import { AiFillEdit } from "react-icons/ai";

type FormFieldProps = {
  labelText?: string;
  children: ReactElement;
  editable: boolean;
  onCLick: MouseEventHandler<HTMLButtonElement>;
};

export const FormField = ({
  labelText,
  children,
  editable,
  onCLick,
}: FormFieldProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p>{labelText}</p>
        <button
          type="button"
          onClick={onCLick}
          className={editable ? "" : "hidden"}
        >
          <AiFillEdit className="text-xl" />
        </button>
      </div>
      {children}
    </div>
  );
};
