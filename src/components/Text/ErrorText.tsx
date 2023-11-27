type Props = {
  errorText: string
}

export const ErrorText = ({ errorText }: Props): JSX.Element => (
  <strong className="text-xs text-red-500">
    {errorText}
  </strong>
)