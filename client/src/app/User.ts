import { Thought } from "./Thought";

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    thoughts?:[Thought]
  }
  