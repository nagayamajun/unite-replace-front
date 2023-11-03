export type User = {
  id: string;
  name?: string;                         
  imageUrl?: string;
  age?: string;
  prefecture?: string;
  university?: string;
  undergraduate?: string;
  graduateYear?: string;
  selfPublicity?: string; //自己紹介
  careerVision?: string;
  developmentExperience?: boolean;
  internshipExperience?: boolean;
  githubAccount?: string;
  programingSkills?: string[];
}