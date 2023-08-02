import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { AddRecruit } from "@/features/recruit/components/templates/AddRecruit";
import { ReactElement } from "react";

const addRecruit = () => {
  return <AddRecruit />;
};

addRecruit.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default addRecruit;
