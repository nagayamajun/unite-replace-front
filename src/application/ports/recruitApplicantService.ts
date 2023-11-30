import { RecruitApplication, RecruitApplicationWithRoomId } from "@/domein/recruitApplication";

export interface RecruitApplicationService {
  findByApplicantIdAndRecruitId: (recruitId: string) => Promise<RecruitApplication>;
  applyFor: (recruitId: string) => Promise<RecruitApplicationWithRoomId>
}