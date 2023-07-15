import { Employee } from "./employee";

export type Corporation = {
  id: string
  email: string  
  sharedPassword?: string     
  name?: string
  imageUrl?: string
  DescriptionOfBusiness?: string
  location?: string
  phoneNumber?: string           
  employees?: Employee[]
};
