type Props = {
  message?: string
}

export const Loading = ({ message}: Props):JSX.Element => {
  return (
    <div className="flex flex-col justify-center h-screen w-full items-center">
      <p className="font-semibold">{message}</p>
      <img src="/load.gif" className=" w-16 h-16"/>
    </div>
  )
}
