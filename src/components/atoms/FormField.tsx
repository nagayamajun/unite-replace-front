import Image from "next/image";
import { MouseEventHandler, ReactElement } from "react";

type FormFieldProps = {
  labelText?: string;
  children: ReactElement;
  editable: boolean;
  onCLick: MouseEventHandler<HTMLImageElement>;
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
        <Image
          src="/pen.gif"
          alt="鉛筆のロゴ"
          width={60}
          height={60}
          onClick={onCLick}
          className={editable ? "" : "hidden"}
        />
      </div>
      {children}
    </div>
  );
};
