import {
  Expose,
  Type,
} from 'class-transformer';
import {
  City,
  OfferFeature,
  OfferType,
} from '../../../types/index.js';
import { CoordinatesRdo } from './coordinates.rdo.js';
export class DetailedOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public type: OfferType;

  @Expose()
  public city: City;

  @Expose()
  public postDate: Date;

  @Expose()
  public photoPreview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public commentCount: number;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public price: number;

  @Expose()
  public features: OfferFeature[];

  @Expose()
  @Type(() => CoordinatesRdo)
  public coordinates: CoordinatesRdo;
}
