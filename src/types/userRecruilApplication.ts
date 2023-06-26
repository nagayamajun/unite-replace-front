export type UserRecruitApplication = {
  id: string;
  applicantId: string;
  recruitId: string;
};

export type UserRecruitApplicationWithRoomId = UserRecruitApplication & {
  roomId: string;
};
