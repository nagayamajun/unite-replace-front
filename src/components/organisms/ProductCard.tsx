import { Recruit } from "@/types/recruit";
import { User } from "@/types/user";
import { FieldValue } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string
  headline: string;
  recruit: Recruit;
};
export const ProductCard = ({
  id,
  headline,
  recruit,
}: Props) => {
  const { name, imageUrl } = recruit.recruiter as User;
  const participantsInfo = recruit.userRecruitParticipant;
  const participants = participantsInfo?.filter((res) => res.isApproved).map((res) => res.user);

  

  return (
    <Link href={`/corporation/product/${id}`} className="flex flex-col bg-white rounded-md shadow-sm p-5 space-y-4 hover:bg-blue-50">
      <div className="flex flex-col space-y-1">
        <div className="text-sm">Product名</div>
        <div className="font-semibold text-lg">{headline}</div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="text-sm">関連した人</div>
        <div className="flex flex-row items-center space-x-4">
          <Image src={imageUrl ? imageUrl : "/avatar.gif"} alt="Image Description" width={50} height={50} className="border border-gray-200 rounded-full"/>
          <div>{name}</div>
        </div>
        { participants?.map((participant) => (  
          <div key={participant.id} className="flex flex-row items-center space-x-4">
            <Image src={participant?.imageUrl ? participant.imageUrl : "/avatar.gif"} alt="Image Description" width={50} height={50} className="border border-gray-200 rounded-full"/>
            <div>{participant.name}</div>
          </div>
        ))}
      </div>
    </Link>
  );
};

