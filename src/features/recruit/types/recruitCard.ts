export type recruitCard = {
  headline: string;
  timestamp: any;
  recruitment_details: string;
  programing_skills?: Option[];
  user_id: string;
  //   tag_id?: any;
  //   number_of_applicants?: string[];
  //   development_period?: string;
  //   hackathon_url?: string;
  //   recruitment_number?: number;
};

//react-hook-form用のprogramingの型
export type Option = {
  label: string;
  value: string;
};
