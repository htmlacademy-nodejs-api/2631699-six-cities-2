import {
  IsEmail,
  Length,
} from 'class-validator';
import { UserValidationConfig } from './user-validation.config.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationConfig.email.invalidFormat.message })
  public email: string;

  @Length(
    UserValidationConfig.password.length.minValue,
    UserValidationConfig.password.length.maxValue,
    { message: UserValidationConfig.password.length.message },
  )
  public password: string;
}
