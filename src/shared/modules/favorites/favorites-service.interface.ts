import { DocumentType } from '@typegoose/typegoose';
import { FavoritesEntity } from './favorites.entity.js';
import {
  FavoritesDto,
  FavoritesActionDto,
} from './dto/index.js';

export interface FavoritesService {
  find(dto: FavoritesDto): Promise<DocumentType<FavoritesEntity> | null>
  add(dto: FavoritesActionDto): Promise<DocumentType<FavoritesEntity>>;
  delete(dto: FavoritesActionDto): Promise<DocumentType<FavoritesEntity> | null>;
}
