import { Expose } from 'class-transformer';
import { City, OfferType } from '../types/index.js';

export class OfferRdo {
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
  public createdAt: Date;

  @Expose()
  public photoPreview: string;

  @Expose()
  public commentCount: number;

  @Expose()
  public price: number;

  @Expose()
  public rating: number | undefined;
}
