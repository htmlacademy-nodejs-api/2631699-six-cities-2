import {
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CreateCommentValidationConfig } from './create-comment.config.js';

export class CreateCommentDto {
  @MinLength(
    CreateCommentValidationConfig.text.minLength.value,
    { message: CreateCommentValidationConfig.text.minLength.message },
  )
  @MaxLength(
    CreateCommentValidationConfig.text.maxLength.value,
    { message: CreateCommentValidationConfig.text.maxLength.message },
  )
  public text: string;

  @IsInt({ message: CreateCommentValidationConfig.rating.invalidFormat })
  @Min(
    CreateCommentValidationConfig.rating.min.value,
    { message: CreateCommentValidationConfig.rating.min.message },
  )
  @Max(
    CreateCommentValidationConfig.rating.max.value,
    { message: CreateCommentValidationConfig.rating.max.message },
  )
  public rating: number;
}
