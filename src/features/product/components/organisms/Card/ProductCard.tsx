import { Recruit } from "@/features/recruit/types/recruit";
import { User } from "@/features/user/types/user";
import Link from "next/link";
import { PersonIcon } from "../../../../../components/molecules/Icon/PersonIcon";
import { SelectedSkillsList } from "@/components/molecules/SkillList/SelectedSkillsList";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";

type Props = {
  id: string
  name: string;
  recruit: Recruit;
  skills?: ProgrammingSkill[]
};
export const ProductCard = ({
  id,
  name: productName,
  recruit,
  skills
}: Props) => {
  const { name, imageUrl } = recruit.recruiter as User;
  const participantsInfo = recruit.userRecruitParticipant;
  const participants = participantsInfo?.filter((res) => res.isApproved).map((res) => res.user);

  return (
    <Link href={`/corporation/product/${id}`} className="flex flex-col bg-white rounded-md shadow-sm p-5 space-y-4 hover:bg-blue-50">
      <div className="flex flex-col space-y-1">
        <div className="text-sm">プロダクト名</div>
        <div className="font-semibold text-lg">{productName}</div>
      </div>
      <SelectedSkillsList
        selectedSkillsDescription="技術スタック"
        selectedSkills={skills}
      />
      <div className="flex flex-col space-y-1">
        <div className="text-sm">関連した人</div>
        <div className="flex flex-row items-center space-x-4">
          <PersonIcon 
            originalIconImageSrc={imageUrl}
          />
          <div>{name}</div>
        </div>
        { participants?.map((participant) => (  
          <div key={participant.id} className="flex flex-row items-center space-x-4">
            <PersonIcon
              originalIconImageAlt={participant.imageUrl}
            />
            <div>{participant.name}</div>
          </div>
        ))}
      </div>
    </Link>
  );
};

