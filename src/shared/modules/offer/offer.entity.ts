import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import {
  OfferFeature,
  OfferType,
  City, Coordinates,
} from '../../types/index.js';
import { UserEntity } from '../user/index.js';

const OfferConfig = {
  name: {
    minLength: 10,
    maxlength: 100,
  },
  description: {
    minLength: 20,
    maxLength: 1024,
  },
  photos: {
    count: 6,
  },
  rating: {
    min: 1,
    max: 5,
  },
  roomsCount: {
    min: 1,
    max: 8,
  },
  guestCount: {
    min: 1,
    max: 10,
  },
  price: {
    min: 100,
    max: 100000,
  },
};

class CoordinatesSchema implements Coordinates {
  @prop({ required: true })
    lat!: number;

  @prop({ required: true })
    lon!: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: OfferConfig.name.minLength,
    maxlength: OfferConfig.name.maxlength,
  })
  public name!: string;

  @prop({
    trim: true,
    required: true,
    minlength: OfferConfig.description.minLength,
    maxlength: OfferConfig.description.maxLength,
  })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: City;

  @prop({ required: true })
  public photoPreview!: string;

  @prop({
    required: true,
    type: () => [String],
    validate: {
      validator: (photos: string[]) => photos.length === OfferConfig.photos.count,
      message: `Must have exactly ${OfferConfig.photos.count} photos in offer`,
    },
  })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({
    required: true,
    validate: {
      validator: (value: number) => value >= OfferConfig.rating.min && value <= OfferConfig.rating.max,
    },
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({
    required: true,
    validate: {
      validator: (value: number) => value >= OfferConfig.roomsCount.min && value <= OfferConfig.roomsCount.max,
    },
  })
  public roomsCount!: number;

  @prop({
    required: true,
    validate: {
      validator: (value: number) => value >= OfferConfig.guestCount.min && value <= OfferConfig.guestCount.max,
    },
  })
  public guestCount!: number;

  @prop({
    required: true,
    validate: {
      validator: (value: number) => value >= OfferConfig.price.min && value <= OfferConfig.price.max,
    },
  })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferFeature,
  })
  public features!: OfferFeature[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({
    required: true,
    type: CoordinatesSchema,
    _id: false,
  })
  public coordinates!: CoordinatesSchema;
}

export const OfferModel = getModelForClass(OfferEntity);
