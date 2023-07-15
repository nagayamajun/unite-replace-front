export type User = {
  id: string;
  firebaseUID: string;
  name?: string;
  imageUrl?: string;
  age?: string;
  prefecture?: string;
  university?: string;
  undergraduate?: string;
  graduateYear?: string;
  selfPublicity?: string;
  careerVision?: string;
  position?: string;
  development_experience?: boolean;
  internship_experience?: boolean;
  githubAccount?: string;
  programingSkills?: [string];
  room_ids?: string[];
};

//position, prefectureはcollectionとして管理する。
