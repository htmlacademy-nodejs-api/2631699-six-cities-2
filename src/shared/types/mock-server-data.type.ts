import { City } from './city.enum.js';
import { OfferType } from './offer-type.enum.js';
import { OfferFeature } from './offer-feature.enum.js';
import { User } from './user.interface.js';
import { Coordinates } from './coordinates.type.js';

export type MockServerData = {
  names: string[];
  descriptions: string[];
  cities: City[],
  photoPreviews: string[],
  photos: string[],
  types: OfferType[],
  features: OfferFeature[],
  users: User[],
  coordinates: Coordinates[],
}
