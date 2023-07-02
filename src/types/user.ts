export type User = {
  id: string;
  firebaseUID: string;
  name?: string;
  imageUrl?: string;
  age?: string;
  prefecture?: string;
  university?: string;
  graduateYear?: string;
  self_publicity?: string;
  career_vision?: string;
  position?: string;
  development_experience?: boolean;
  internship_experience?: boolean;
  githubAccount?: string;
  programingSkills?: [string];
  room_ids?: string[];
};

//position, prefectureはcollectionとして管理する。
