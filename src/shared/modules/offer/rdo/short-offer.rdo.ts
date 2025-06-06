import { Expose } from 'class-transformer';
import {
  City,
  OfferType,
} from '../../../types/index.js';

export class ShortOfferRdo {
  @Expose()
  public name: string;

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

  public commentsCount: number;
}
