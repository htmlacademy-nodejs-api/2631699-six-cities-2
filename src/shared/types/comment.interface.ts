import { User } from './user.interface.js';

export interface Comment {
  postDate: Date,
  text: string,
  rating: number,
  author: User,
}
