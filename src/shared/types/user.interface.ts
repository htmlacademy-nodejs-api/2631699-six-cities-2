import { UserType } from './user-type.enum.js';
import { UserAvatarType } from './user-avatar.type.js';

export type User = {
  avatar?: UserAvatarType;
  email: string;
  name: string;
  password: string;
  type: UserType;
}
