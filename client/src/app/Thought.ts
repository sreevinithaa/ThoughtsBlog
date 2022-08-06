import { Comment } from 'src/app/Comment';
export interface Thought {
    _id?: string;
    thoughtText: string;
    thoughtAuthor: string;
    createdAt?: Date;
    comments? : [Comment]
  }
  