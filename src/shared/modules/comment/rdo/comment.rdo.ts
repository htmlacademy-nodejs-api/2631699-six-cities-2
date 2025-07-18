import {
  Expose,
  Type,
} from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose({ name: 'createdAt'})
  public postDate: string;

  @Expose()
  public rating: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
