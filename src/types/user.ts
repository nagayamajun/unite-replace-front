export type User = {
  id: string;
  firebaseUID: string;
  name?: string;
  image_url?: string;
  age?: string;
  prefecture?: string;
  university?: string;
  graduateYear?: string;
  self_publicity?: string;
  career_vision?: string;
  position?: string;
  development_experience?: boolean;
  internship_experience?: boolean;
  github?: string;
  programingSkills?: [string];
  room_ids?: string[];
};

//position, prefectureはcollectionとして管理する。
