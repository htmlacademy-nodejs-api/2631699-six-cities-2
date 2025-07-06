import { IsNumber } from 'class-validator';
import { OfferValidationConfig } from './offer-validation.config.js';

export class CoordinatesDto {
  @IsNumber({}, { message: OfferValidationConfig.coordinates.lat.invalidFormat.message })
  public lat: number;

  @IsNumber({}, { message: OfferValidationConfig.coordinates.lon.invalidFormat.message })
  public lon: number;
}
