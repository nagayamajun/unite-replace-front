import { UserLayout } from "@/components/templetes/layouts/UserLayout";
import { AddRecruit } from "@/components/templetes/user/AddRecruit";
import { ReactElement } from "react";

const addRecruit = () => {
  return <AddRecruit />;
};

addRecruit.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default addRecruit;
