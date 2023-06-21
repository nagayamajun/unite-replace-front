import Image from "next/image";
import { MouseEventHandler } from "react";

type FormFieldProps = {
  labelText: string;
  children: any;
  onCLick: MouseEventHandler<HTMLImageElement>;
};

export const FormField = ({
  labelText,
  children,
  onCLick,
}: FormFieldProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 text-lg w-2/5">
      <div className="flex items-center justify-between">
        <div>{labelText}</div>
        <Image
          src="/pen.gif"
          alt="鉛筆のロゴ"
          width={60}
          height={60}
          onClick={onCLick}
        />
      </div>
      {children}
    </div>
  );
};
