import { Employee } from "./employee";

export type Corporation = {
  id: string
  email: string  
  sharedPassword?: string     
  name?: string
  imageUrl?: string
  descriptionOfBusiness?: string
  location?: string
  phoneNumber?: string           
  employees?: Employee[]
};
