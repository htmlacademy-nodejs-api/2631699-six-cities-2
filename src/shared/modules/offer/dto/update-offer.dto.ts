import {
  OfferType,
  City,
  OfferFeature,
  Coordinates,
} from '../../../types/index.js';
import { CreateOfferDto } from './create-offer.dto.js';

export class UpdateOfferDto implements Partial<CreateOfferDto> {
  public name?: string;
  public description?: string;
  public city?: City;
  public photoPreview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public type?: OfferType;
  public roomsCount?: number;
  public guestCount?: number;
  public price?: number;
  public features?: OfferFeature[];
  public coordinates?: Coordinates;
}
