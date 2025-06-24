import {
  inject,
  injectable,
} from 'inversify';
import {
  DocumentType,
  types,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { FavoritesService } from './favorites-service.interface.js';
import { Component } from '../../types/index.js';
import { FavoritesEntity } from './favorites.entity.js';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class DefaultFavoritesService implements FavoritesService {
  constructor(
    @inject(Component.FavoritesModel) private readonly favoritesModel: types.ModelType<FavoritesEntity>,
  ) {}

  async find(userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    const [result] = await this.favoritesModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'offers',
          let: { offerIds: '$offers' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toString: '$_id' },
                    '$$offerIds',
                  ]
                }
              }
            },
            {
              $addFields: {
                isFavorite: true,
              }
            }
          ],
          as: 'offers',
        }
      }
    ]).exec();
    return result?.offers;
  }

  public async add(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity>> {
    return this.favoritesModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { offers: offerId } },
      { upsert: true, new: true }
    );
  }

  public async delete(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { offers: offerId } },
      { new: true },
    );
  }
}
