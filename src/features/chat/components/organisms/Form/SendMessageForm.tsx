import Image from "next/image";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket
  roomId: string
}

export const SendMessageForm = ({ socket, roomId }: Props) => {

  const { register, handleSubmit, reset } = useForm();
  const onMessageSubmit = async (submitData: any) => {
    socket.emit("toServer", { ...submitData, roomId });
    reset();
  };

  return (
    <form
      className="fixed bottom-4 right-4 w-[90%] sm:w-3/5"
      onSubmit={handleSubmit(onMessageSubmit)}
    >
      <div className="flex bg-gray-100 rounded-2xl">
        <textarea
          className="w-full bg-inherit rounded-2xl outline-none p-4"
          {...register("message")}
        />
        <button type="submit">
          <Image
            src="/paperplane.gif"
            alt="メッセージ送信ボタンのロゴ"
            width={40}
            height={40}
          />
        </button>
      </div>
    </form>
  )
}