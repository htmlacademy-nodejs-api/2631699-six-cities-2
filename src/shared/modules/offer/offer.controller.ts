import {
  inject,
  injectable,
} from 'inversify';
import {
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpMethod,
  HttpError,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo, ShortOfferRdo } from './rdo/index.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { ParamOfferId } from './type/param-offerId.type.js';
import { ParamCityId } from './type/param-city.type.js';
import { City } from '../../types/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.getDetail });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addToFavorites });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.removeFromFavorites });
  }

  public async index(_request: Request, response: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(response, fillDTO(OfferRdo, offers));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    response: Response
  ): Promise<void> {
    const offerExist = await this.offerService.findByName(body.name);

    if (offerExist) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.name}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body, 'user_id');
    this.created(response, fillDTO(OfferRdo, result));
  }

  public async getDetail(
    { params }: Request<ParamOfferId>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with ID ${offerId} not found`,
        'OfferController'
      );
    }

    this.ok(response, fillDTO(OfferRdo, offer));
  }

  public async update(
    { body, params }: Request<ParamOfferId, Record<string, unknown>, UpdateOfferDto>,
    response: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offerExist = await this.offerService.findById(offerId);

    if (!offerExist) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(offerId, body);
    this.ok(response, fillDTO(OfferRdo, result));
  }

  public async delete(
    { body, params }: Request<ParamOfferId>,
    response: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offerExist = await this.offerService.findById(offerId);

    if (!offerExist) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(offerId, body);

    if (result) {
      this.noContent(response);
    } else {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Failed to delete offer with id «${offerId}».`,
        'OfferController'
      );
    }
  }

  public async getPremium(
    { params }: Request<ParamCityId>,
    response: Response
  ): Promise<void> {
    const city = Object.values(City).includes(params.city as City)
      ? params.city as City
      : null;

    if (!city) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Invalid city parameter',
        'OfferController'
      );
    }

    const offers = await this.offerService.findPremiumInCity(city);

    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Premium offers not found in ${city}`,
        'OfferController'
      );
    }

    this.ok(response, fillDTO(ShortOfferRdo, offers));
  }

  public async getFavorites(
    _request: Request,
    response: Response
  ): Promise<void> {
    const offers = await this.offerService.findFavorites();

    this.ok(response, fillDTO(OfferRdo, offers));
  }

  public async addToFavorites(
    { params }: Request<ParamOfferId>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    const offerExist = await this.offerService.findById(offerId);

    if (!offerExist) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }

    await this.offerService.addToFavorites(offerId);
    this.ok(response);
  }

  public async removeFromFavorites(
    { params }: Request<ParamOfferId>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    const offerExist = await this.offerService.findById(offerId);

    if (!offerExist) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${offerId}» not found.`,
        'OfferController'
      );
    }

    await this.offerService.removeFromFavorites(offerId);
    this.ok(response);
  }

}
