import { enumToString } from '../../../helpers/index.js';
import { City, OfferType } from '../../../types/index.js';

const OFFER_NAME_MIN_LENGTH = 10;
const OFFER_NAME_MAX_LENGTH = 100;
const OFFER_DESCRIPTION_MIN_LENGTH = 20;
const OFFER_DESCRIPTION_MAX_LENGTH = 1024;
const OFFER_PHOTOS_COUNT = 6;
const OFFER_ROOMS_COUNT_MIN = 1;
const OFFER_ROOMS_COUNT_MAX = 8;
const OFFER_GUEST_COUNT_MIN = 1;
const OFFER_GUEST_COUNT_MAX = 10;
const OFFER_PRICE_MIN = 100;
const OFFER_PRICE_MAX = 100000;
const OFFER_FEATURES_MIN_LENGTH = 1;

export const OfferValidationConfig = {
  name: {
    length: {
      minValue: OFFER_NAME_MIN_LENGTH,
      maxValue: OFFER_NAME_MAX_LENGTH,
      message: `Minimum name length is ${OFFER_NAME_MIN_LENGTH}, maximum is ${OFFER_NAME_MAX_LENGTH}`,
    },
  },
  description: {
    length: {
      minValue: OFFER_DESCRIPTION_MIN_LENGTH,
      maxValue: OFFER_DESCRIPTION_MAX_LENGTH,
      message: `Minimum description length is ${OFFER_DESCRIPTION_MIN_LENGTH}, maximum is ${OFFER_DESCRIPTION_MAX_LENGTH}`,
    },
  },
  city: {
    invalid: {
      message: `Must be one of ${enumToString(City)}`,
    },
  },
  photoPreview: {
    required: {
      message: 'Photo preview is required',
    },
  },
  photos: {
    invalidFormat: {
      message: 'Photos items must be string',
    },
    invalidType: {
      message: 'Photos field must be an array',
    },
    length: {
      value: OFFER_PHOTOS_COUNT,
      message: `Array must contain ${OFFER_PHOTOS_COUNT} photos`,
    }
  },
  isPremium: {
    invalid: {
      message: 'Premium flag must be boolean'
    },
  },
  type: {
    invalid: {
      message: `Offer type must be one of ${enumToString(OfferType)}`,
    },
  },
  roomsCount: {
    invalidFormat: {
      message: 'Rooms count must be int',
    },
    min: {
      value: OFFER_ROOMS_COUNT_MIN,
      message: `Min rooms count is ${OFFER_ROOMS_COUNT_MIN}`,
    },
    max: {
      value: OFFER_ROOMS_COUNT_MAX,
      message: `Max rooms count is ${OFFER_ROOMS_COUNT_MAX}`,
    },
  },
  guestCount: {
    invalidFormat: {
      message: 'Guest count must be int',
    },
    min: {
      value: OFFER_GUEST_COUNT_MIN,
      message: `Min guest count is ${OFFER_GUEST_COUNT_MIN}`,
    },
    max: {
      value: OFFER_GUEST_COUNT_MAX,
      message: `Min guest count is ${OFFER_GUEST_COUNT_MAX}`,
    },
  },
  price: {
    invalidFormat: {
      message: 'Price must be int',
    },
    min: {
      value: OFFER_PRICE_MIN,
      message: `Min price is ${OFFER_PRICE_MIN}`,
    },
    max: {
      value: OFFER_PRICE_MAX,
      message: `Min price is ${OFFER_PRICE_MAX}`,
    },
  },
  features: {
    invalidFormat: {
      message: `Features must be one or more of ${enumToString(OfferType)}`,
    },
    invalidType: {
      message: 'Features field must be an array',
    },
    minLength: {
      value: OFFER_FEATURES_MIN_LENGTH,
      message: `Min features length is ${OFFER_FEATURES_MIN_LENGTH}`,
    },
  },
  coordinates: {
    invalidFormat: {
      message: 'Coordinates must be object',
    },
    lat: {
      invalidFormat: {
        message: 'Latitude must be number'
      },
    },
    lon: {
      invalidFormat: {
        message: 'Longitude must be number',
      },
    },
  },
};
