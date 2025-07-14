import {
  City,
  Offer,
  OfferFeature,
  OfferType,
  UserType,
} from '../types/index.js';
import { doesSatisfyEnum } from './common.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    city,
    photoPreview,
    photos,
    isPremium,
    isFavorite,
    type,
    roomsCount,
    guestCount,
    price,
    features,
    user,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  const [userName, userEmail, userAvatar, userPassword, userType] = user.split(';');
  const [lat, lon] = coordinates.split(';');

  return {
    name,
    description,
    city: city as City,
    photoPreview,
    photos: photos.split(';'),
    isPremium: isPremium === 'Y',
    isFavorite: isFavorite === 'Y',
    type: type as OfferType,
    rating: 0,
    roomsCount: Number.parseInt(roomsCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    features: features.split(';').filter((feature) => doesSatisfyEnum(feature, OfferFeature)) as OfferFeature[],
    user: {
      avatar: userAvatar,
      email: userEmail,
      name: userName,
      password: userPassword,
      type: userType as UserType,
    },
    commentCount: 0,
    coordinates: {
      lat: Number.parseFloat(lat),
      lon: Number.parseFloat(lon),
    },
    price: Number.parseInt(price, 10),
  };
}
