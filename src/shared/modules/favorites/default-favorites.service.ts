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
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
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
            }
          ],
          as: 'offers',
        }
      }
    ]).exec();
    return result?.offers;
  }

  public async add(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity>> {
    const result = await Promise.all([
      this.offerModel.updateOne(
        { _id: offerId },
        { $set: { isFavorite: true } }
      ),
      this.favoritesModel.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { offers: offerId } },
        { upsert: true, new: true }
      )
    ]);

    return result[1];
  }

  public async delete(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity> | null> {
    const result = await Promise.all([
      this.offerModel.updateOne(
        { _id: offerId },
        { $set: { isFavorite: false } }
      ),
      this.favoritesModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { offers: offerId } },
        { new: true },
      ),
    ]);

    return result[1];
  }
}
