import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavoritesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavoritesEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
  })
  public userId: Types.ObjectId;

  @prop({
    required: true,
  })
  public offers!: string[];
}

export const FavoritesModel = getModelForClass(FavoritesEntity);
