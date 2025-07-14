import { Expose } from 'class-transformer';

export class LoginUserRdo {
  @Expose()
  public token: string;
}
