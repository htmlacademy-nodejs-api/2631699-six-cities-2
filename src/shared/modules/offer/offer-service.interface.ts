import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import {
  CreateOfferDto,
  UpdateOfferDto,
} from './dto/index.js';
import { City } from '../../types/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]> | null;
  findPremiumInCity(city: City): Promise<DocumentType<OfferEntity>[]> | null;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]> | null;
  addToFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
