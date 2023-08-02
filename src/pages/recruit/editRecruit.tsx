import { UserLayout } from "@/components/layouts/Layout/UserLayout"
import { EditRecruit } from "@/features/recruit/components/templates/EditRecruit"
import { ReactElement } from "react"

const EditRecruitPage = () => <EditRecruit />

EditRecruitPage.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>

export default EditRecruitPage