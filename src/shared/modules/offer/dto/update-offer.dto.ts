import {
  OfferType,
  City,
  OfferFeature,
  Coordinates,
} from '../../../types/index.js';
import { CreateOfferDto } from './create-offer.dto.js';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OfferValidationConfig } from './offer-validation.config.js';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';

export class UpdateOfferDto implements Partial<CreateOfferDto> {
  @IsOptional()
  @Length(
    OfferValidationConfig.name.length.minValue,
    OfferValidationConfig.name.length.maxValue,
    { message: OfferValidationConfig.name.length.message },
  )
  public name?: string;

  @IsOptional()
  @Length(
    OfferValidationConfig.description.length.minValue,
    OfferValidationConfig.description.length.maxValue,
    { message: OfferValidationConfig.description.length.message },
  )
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: OfferValidationConfig.city.invalid.message })
  public city?: City;

  @IsOptional()
  @IsString({ message: OfferValidationConfig.photoPreview.required.message })
  public photoPreview?: string;

  @IsOptional()
  @IsArray({ message: OfferValidationConfig.photos.invalidType.message })
  @Length(
    OfferValidationConfig.photos.length.value,
    OfferValidationConfig.photos.length.value,
    { message: OfferValidationConfig.photos.length.message })
  @IsString({ each: true, message: OfferValidationConfig.photos.invalidFormat.message })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferValidationConfig.isPremium.invalid.message })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(City, { message: OfferValidationConfig.type.invalid.message })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OfferValidationConfig.roomsCount.invalidFormat.message })
  @Min(
    OfferValidationConfig.roomsCount.min.value,
    { message: OfferValidationConfig.roomsCount.min.message },
  )
  @Max(
    OfferValidationConfig.roomsCount.max.value,
    { message: OfferValidationConfig.roomsCount.max.message },
  )
  public roomsCount?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationConfig.guestCount.invalidFormat.message })
  @Min(
    OfferValidationConfig.guestCount.min.value,
    { message: OfferValidationConfig.guestCount.min.message },
  )
  @Max(
    OfferValidationConfig.guestCount.max.value,
    { message: OfferValidationConfig.guestCount.max.message },
  )
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationConfig.price.invalidFormat.message })
  @Min(
    OfferValidationConfig.price.min.value,
    { message: OfferValidationConfig.price.min.message },
  )
  @Max(
    OfferValidationConfig.price.max.value,
    { message: OfferValidationConfig.price.max.message },
  )
  public price?: number;

  @IsOptional()
  @IsArray({ message: OfferValidationConfig.features.invalidType.message })
  @IsEnum(OfferFeature, { each: true, message: OfferValidationConfig.features.invalidFormat.message })
  @MinLength(
    OfferValidationConfig.features.minLength.value,
    { message: OfferValidationConfig.features.minLength.message },
  )
  public features?: OfferFeature[];

  @IsOptional()
  @IsObject({ message: OfferValidationConfig.coordinates.invalidFormat.message })
  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates?: Coordinates;
}
