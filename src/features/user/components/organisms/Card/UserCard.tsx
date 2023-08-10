import Link from "next/link";
import { PersonIcon } from "../../../../../components/molecules/Icon/PersonIcon";
import { User } from "@/features/user/types/user";

type Props = {
  user: User;
};
export const UserCard = ({ user }: Props) => {
  return (
    <div className="font-caveat group group px-8 py-4 relative mb-2 h-full w-full border overflow-hidden rounded-3xl bg-white lg:mb-3">
      <div className="flex justify-center">
        <PersonIcon
          originalIconImageSrc={user?.imageUrl}
          originalIconImageAlt={`${user?.name}のアイコン`}
        />
      </div>
      <div className="flex flex-col justify-center ">
        <p className="m-auto p-1">{user.name ? user.name : "No Name"}</p>
        <p className="m-auto p-1">
          {user.university ? user.university : "No Univercity"}
        </p>
        {user.programingSkills ? (
          <div className="flex justify-center">
            {user.programingSkills?.map((skill) => {
              return (
                <p key={skill} className="bg-red-50 rounded-3xl table m-1 ">
                  {skill}
                </p>
              );
            })}
          </div>
        ) : (
          <p className="m-auto">No Slill..</p>
        )}
      </div>
      <div className="flex justify-end mr-3">
        <Link href={`/profiles/user/${user.id}`}>詳細ページ</Link>
      </div>
    </div>
  );
};
