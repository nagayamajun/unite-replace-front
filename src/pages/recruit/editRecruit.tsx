import { UserLayout } from "@/components/templetes/layouts/UserLayout"
import { EditRecruit } from "@/components/templetes/user/EditRecruit"
import { ReactElement } from "react"

const EditRecruitPage = () => <EditRecruit />

EditRecruitPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>

export default EditRecruitPage