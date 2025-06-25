import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { FavoritesService } from './favorites-service.interface.js';
import { Component } from '../../types/index.js';
import { FavoritesEntity, FavoritesModel } from './favorites.entity.js';
import { DefaultFavoritesService } from './default-favorites.service.js';
import { Controller } from '../../libs/rest/index.js';
import { FavoritesController } from './favorites.controller.js';

export function createFavoritesContainer() {
  const favoritesContainer = new Container();

  favoritesContainer.bind<FavoritesService>(Component.FavoritesService)
    .to(DefaultFavoritesService)
    .inSingletonScope();

  favoritesContainer.bind<types.ModelType<FavoritesEntity>>(Component.FavoritesModel)
    .toConstantValue(FavoritesModel);

  favoritesContainer.bind<Controller>(Component.FavoritesController).to(FavoritesController).inSingletonScope();

  return favoritesContainer;
}
