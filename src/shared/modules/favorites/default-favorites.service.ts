import {
  inject,
  injectable,
} from 'inversify';
import {
  DocumentType,
  types,
} from '@typegoose/typegoose';

import { FavoritesService } from './favorites-service.interface.js';
import { Component } from '../../types/index.js';
import { FavoritesEntity } from './favorites.entity.js';
import { FavoritesActionDto, FavoritesDto } from './dto/index.js';

@injectable()
export class DefaultFavoritesService implements FavoritesService {
  constructor(
    @inject(Component.FavoritesModel) private readonly favoritesModel: types.ModelType<FavoritesEntity>
  ) {}

  find(dto: FavoritesDto): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel.findById(dto.userId);
  }

  public async add(dto: FavoritesActionDto): Promise<DocumentType<FavoritesEntity>> {
    return this.favoritesModel.findOneAndUpdate(
      { _id: dto.userId },
      { $addToSet: { offers: dto.offerId } },
      { upsert: true, new: true }
    );
  }

  public async delete(dto: FavoritesActionDto): Promise<DocumentType<FavoritesEntity> | null> {
    return this.favoritesModel.findOneAndUpdate(
      { _id: dto.userId },
      { $pull: { offers: dto.userId } }
    );
  }
}
