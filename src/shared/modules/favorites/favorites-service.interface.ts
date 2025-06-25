import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { FavoritesEntity } from './favorites.entity.js';

export interface FavoritesService {
  find(userId: string): Promise<DocumentType<OfferEntity>[] | null>
  add(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity>>;
  delete(offerId: string, userId: string): Promise<DocumentType<FavoritesEntity> | null>;
}
