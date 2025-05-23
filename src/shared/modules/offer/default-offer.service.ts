import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import {
  City,
  Component,
  SortType,
} from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT,
} from './offer.constant.js';
import {
  CreateOfferDto,
  UpdateOfferDto,
} from './dto/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async find(count: number = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .limit(count)
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async findPremiumInCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({
        isPremium: true,
        city: {
          $eq: city,
        },
      })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({
        isFavorite: true,
      })
      .populate(['userId'])
      .exec();
  }

  public async addToFavorites(offerId: string,): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { isFavorite: true }, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async removeFromFavorites(offerId: string,): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { isFavorite: false }, { new: true })
      .populate(['userId'])
      .exec();
  }
}
