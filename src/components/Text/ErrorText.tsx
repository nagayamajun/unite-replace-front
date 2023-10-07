type Props = {
  errorText: string
}

export const ErrorText = ({ errorText }: Props): JSX.Element => (
  <p className="text-xs text-red-500">
    {errorText}
  </p>
)