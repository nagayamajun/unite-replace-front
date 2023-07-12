import { Corporation } from "./corporation";

export type Employee = {
  id: string
  firebaseUID: string   
  name: string
  email: string
  imageUrl: string
  introduction: string
  phoneNumber: string
  belongToCorporation: Corporation
};
