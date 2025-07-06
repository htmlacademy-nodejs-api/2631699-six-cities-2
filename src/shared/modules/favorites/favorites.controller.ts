import {
  inject,
  injectable,
} from 'inversify';
import {
  Request,
  Response,
} from 'express';

import {
  BaseController,
  HttpMethod,
  ValidateObjectIdMiddleware, DocumentExistsMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { FavoritesService } from './favorites-service.interface.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { ParamOfferId } from '../../types/param-offerId.type.js';
import { OfferRdo } from '../../rdo/offer.rdo.js';

@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoritesService) protected readonly favoritesService: FavoritesService,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFromFavorites,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async getFavorites(
    _request: Request,
    response: Response,
  ): Promise<void> {
    const offers = await this.favoritesService.find('685a799b02f35881181febfd');
    this.ok(response, fillDTO(OfferRdo, offers));
  }

  public async addToFavorites(
    { params }: Request<ParamOfferId>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;
    await this.favoritesService.add(offerId, '685a799b02f35881181febfd');
    this.ok(response);
  }

  public async removeFromFavorites(
    { params }: Request<ParamOfferId>,
    response: Response
  ): Promise<void> {
    const { offerId } = params;

    await this.favoritesService.delete(offerId, '685a799b02f35881181febfd');
    this.ok(response);
  }
}
