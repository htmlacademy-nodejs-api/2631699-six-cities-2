import { UserType } from '../../../types/index.js';
import {
  IsEmail,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserValidationConfig } from './user-validation.config.js';

export class CreateUserDto {
  @Length(
    UserValidationConfig.name.length.minValue,
    UserValidationConfig.name.length.maxValue,
    { message: UserValidationConfig.name.length.message },
  )
  public name: string;

  @IsEmail({}, { message: UserValidationConfig.email.invalidFormat.message })
  public email: string;

  @Length(
    UserValidationConfig.password.length.minValue,
    UserValidationConfig.password.length.maxValue,
    { message: UserValidationConfig.password.length.message },
  )
  public password: string;

  @IsOptional()
  public avatar: string;

  @IsEnum(UserType, { message: UserValidationConfig.type.invalid.message })
  public type: UserType;
}
