export type recruitCard = {
  headline: string;
  timestamp: any;
  recruitment_details: string;
  programing_skills?: Option[];
  user_id: string;
};

//react-hook-form用のprogramingの型
export type Option = {
  label: string;
  value: string;
};
