import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import {
  CreateOfferDto,
  UpdateOfferDto,
} from './dto/index.js';
import { City } from '../../types/index.js';

export interface OfferService {
  create(dto: CreateOfferDto, userId: string): Promise<DocumentType<OfferEntity>>;
  find(userId: string, count?: number): Promise<DocumentType<OfferEntity>[]> | null;
  findPremiumInCity(userId: string, city: City): Promise<DocumentType<OfferEntity>[]> | null;
  findById(userId: string, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByName(userId: string, offerName: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(userId: string, offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
}
