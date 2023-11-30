
type Props = {
  title: string
}

export const H2Title = (props: Props): JSX.Element => {

  return (
    <h2 className="w-full text-xl">{props.title}</h2>
  )
}