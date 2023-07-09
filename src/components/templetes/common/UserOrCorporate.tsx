import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillPersonFill } from "react-icons/bs";

export const UserOrCorporate = () => {
  const router = useRouter();

  const directUser = () => {
    router.push("/homeScreen");
  };

  const directCorporate = () => {
    router.push("/corporation");
  };

  return (
    <div className="flex-1 flex gap-8 border-black/20 h-screen justify-center items-center pb-5">
      <button
        onClick={directUser}
        className="rounded-2xl font-zen font-light bg-white mr-10 text-xl pb-10 mb-2 p-1 focus:bg-white/50 hover:bg-white/50"
      >
        <BsFillPersonFill size={300} fill="gray" />
        <p>学生の方はこちら</p>
      </button>
      <button
        onClick={directCorporate}
        className="rounded-2xl font-zen font-light bg-white text-xl pb-10 mb-2 p-1 focus:bg-white/50 hover:bg-white/50"
      >
        <BsFillPersonFill size={300} fill="gray" />
        <p>企業の方はこちら</p>
      </button>
    </div>
  );
};
