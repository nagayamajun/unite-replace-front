import { FocusEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "../Text/ErrorText";


type Props = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
  onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined;
};

export const PlainTextArea = ({
  label,
  placeholder,
  defaultValue,
  register,
  onBlur,
  disabled,
  error
}: Props): JSX.Element => (
  <div className="flex flex-col gap-1 mb-6 w-full">
    <label htmlFor="nameInput" className="text-xs sm:text-sm">
      {label}
    </label>
    <textarea
      id="textarea"
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      className="border border-gray-300 h-32 rounded-md shadow-sm w-full outline-green-500 text-sm p-2"
      {...register}
      onBlur={onBlur}
    ></textarea>
    <div className="h-[24px]">
      {error && (
        <ErrorText errorText={error} />
      )}
    </div>
  </div>
);
