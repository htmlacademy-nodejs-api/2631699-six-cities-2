import { City } from './city.enum.js';
import { OfferType } from './offer-type.enum.js';
import { OfferFeature } from './offer-feature.enum.js';
import { User } from './user.interface.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
  city: City,
  commentsCount: number,
  coordinates: Coordinates,
  features: OfferFeature[],
  guestCount: number,
  isPremium: boolean,
  isFavorite: boolean,
  name: string,
  description: string,
  photos: string[],
  photoPreview: string,
  price: number,
  rating: number,
  roomsCount: number,
  type: OfferType,
  user: User,
};
