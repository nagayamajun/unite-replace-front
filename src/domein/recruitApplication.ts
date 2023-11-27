export type RecruitApplication = {
  id: string;
  applicantId: string;
  recruitId: string;
};

export type RecruitApplicationWithRoomId = RecruitApplication & {
  roomId: string;
};