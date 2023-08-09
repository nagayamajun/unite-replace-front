import { useUser } from "@/hooks/useUser";
import { Loading } from "../../../../../components/organisms/Loading/Loading";
import { UserCard } from "../Card/UserCard";

export const UserList = () => {
  const { users } = useUser();

  if (!users) return <Loading />;

  return (
    <>
      <div className="flex justify-center font-bold mt-5">ユーザー一覧</div>
      <div className="grid mx-20 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </>
  );
};
