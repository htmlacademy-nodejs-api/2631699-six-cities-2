import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import {
  MockServerData,
  OfferType,
  Coordinates,
  User,
} from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 50;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const photoPreview = getRandomItem<string>(this.mockData.photoPreviews);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = getRandomItem<string>(['Y', 'N']);
    const isFavorite = getRandomItem<string>(['Y', 'N']);
    const type = getRandomItem<OfferType>(this.mockData.types);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT);
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const features = getRandomItems<string>(this.mockData.features).join(';');
    const user = Object.values(getRandomItem<User>(this.mockData.users)).join(';');
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    const coordinates = Object.values(getRandomItem<Coordinates>(this.mockData.coordinates)).join(';');
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);

    return [
      name,
      description,
      postDate,
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
      coordinates,
    ].join('\t');
  }
}
