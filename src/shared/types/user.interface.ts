import { UserType } from './user-type.enum.js';

export type User = {
  avatar: string;
  email: string;
  name: string;
  password: string;
  type: UserType;
}
