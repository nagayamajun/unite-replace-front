import Image from "next/image";
import { useRouter } from "next/router";

export const UserOrCorporate = () => {
  const router = useRouter();

  const directUser = () => {
    router.push("/confirmAuth");
  }

  const directCorporate = () => {
    router.push("/corporation");
  }

  return (
    <>
      <div className="flex-1 flex border-black/20 h-screen justify-center items-center pb-5">
        <button onClick={directUser} className="rounded-2xl font-zen font-light bg-white mr-10 text-xl pb-10 mb-2 p-1 focus:bg-white/50 hover:bg-white/50">
          <Image src="/avatar.gif" width={400} height={400} alt="アバター"/>
          <p>学生の方はこちら</p>
        </button>
        <button onClick={directCorporate} className="rounded-2xl font-zen font-light bg-white text-xl pb-10 mb-2 p-1 focus:bg-white/50 hover:bg-white/50">
          <Image src="/avatar.gif" width={400} height={400} alt="アバター"/>
          <p>企業の方はこちら</p>
        </button>
      </div>
    </>
  )
};
