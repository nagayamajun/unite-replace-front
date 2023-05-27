import { EditProfile } from "@/components/templetes/user/EditProfile";
import { UserRepository } from "@/modules/user/user.repository";
import { User } from "@/types/user"
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

type SSRProps = {
  user: User;
}

interface Param extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  const { id } = context.query;
   const user = await UserRepository.findByFirebaseUIDWithoutFirebaseAuth(id as string);

  return {
    props: {
      user
    }
  }
}

const EditProfilePage = ({user}: SSRProps) => {

  return (
    <EditProfile userStateVal={user}/>
  )
}

export default EditProfilePage;
