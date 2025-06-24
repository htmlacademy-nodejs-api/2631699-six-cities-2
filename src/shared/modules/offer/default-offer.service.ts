import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';

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
import { FavoritesEntity } from '../favorites/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.FavoritesModel) private readonly favoritesModel: types.ModelType<FavoritesEntity>,
  ) {}

  public async create(dto: CreateOfferDto, userId: string): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({
      ...dto,
      userId,
    });
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async find(userId: string, count: number = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find()
      .limit(count)
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();

    if (!offers) {
      return [];
    }

    return this.offersWithFavoritesFlag(offers, userId);
  }

  public async findPremiumInCity(userId: string, city: City): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
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

    if (!offers) {
      return [];
    }

    return this.offersWithFavoritesFlag(offers, userId);
  }

  public async findById(userId: string, offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();

    if (!offer) {
      return null;
    }

    const [result] = await this.offersWithFavoritesFlag([offer], userId);
    return result;
  }

  public async findByName(userId: string, offerName: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .findOne({ name: offerName })
      .populate(['userId'])
      .exec();

    if (!offer) {
      return null;
    }

    const [result] = await this.offersWithFavoritesFlag([offer], userId);
    return result;
  }

  public async updateById(userId: string, offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();

    if (!offer) {
      return null;
    }

    const [result] = await this.offersWithFavoritesFlag([offer], userId);
    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  private async offersWithFavoritesFlag(offers: DocumentType<OfferEntity>[], userId: string): Promise<DocumentType<OfferEntity>[]> {
    const userIdObj = new Types.ObjectId(userId);
    const favorites = await this.favoritesModel.findOne({ _id: userIdObj });

    return offers.map((offer) => {
      const result = offer as DocumentType<OfferEntity> & { isFavorite: boolean };
      result.isFavorite = favorites?.offers?.includes(String(offer._id)) ?? false;
      return result;
    });
  }
}
