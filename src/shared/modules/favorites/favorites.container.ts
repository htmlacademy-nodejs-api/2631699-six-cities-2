import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { FavoritesService } from './favorites-service.interface.js';
import { Component } from '../../types/index.js';
import { FavoritesEntity, FavoritesModel } from './favorites.entity.js';
import { DefaultFavoritesService } from './default-favorites.service.js';

export function createFavoritesContainer() {
  const commentContainer = new Container();

  commentContainer.bind<FavoritesService>(Component.FavoritesService)
    .to(DefaultFavoritesService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<FavoritesEntity>>(Component.FavoritesModel)
    .toConstantValue(FavoritesModel);

  return commentContainer;
}
