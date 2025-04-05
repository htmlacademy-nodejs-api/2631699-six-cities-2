import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  OfferType,
  City,
  OfferFeature,
  UserAvatarType,
  UserType,
} from '../../types/index.js';

const tsvFlagsAdapter = {
  Y: true,
  N: false,
};

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        name,
        description,
        createdDate,
        city,
        photoPreview,
        photos,
        isPremium,
        isFavorite,
        rating,
        type,
        roomsCount,
        guestCount,
        price,
        features,
        user,
        commentsCount,
        coordinates
      ]) => {
        const [userName, userEmail, userAvatar, userPassword, userType] = user.split(';');
        const [lat, lon] = coordinates.split(';');

        return {
          name,
          description,
          postDate: new Date(createdDate),
          city: city as City,
          photoPreview,
          photos: photos.split(';'),
          isPremium: tsvFlagsAdapter[isPremium as 'Y' | 'N'],
          isFavorite: tsvFlagsAdapter[isFavorite as 'Y' | 'N'],
          type: type as OfferType,
          rating: Number.parseInt(rating, 10),
          roomsCount: Number.parseInt(roomsCount, 10),
          guestCount: Number.parseInt(guestCount, 10),
          features: features.split(';') as OfferFeature[],
          user: {
            avatar: userAvatar as UserAvatarType,
            email: userEmail,
            name: userName,
            password: userPassword,
            type: userType as UserType,
          },
          commentsCount: Number.parseInt(commentsCount, 10),
          coordinates: {
            lat,
            lon,
          },
          price: Number.parseInt(price, 10),
        };
      });
  }
}
