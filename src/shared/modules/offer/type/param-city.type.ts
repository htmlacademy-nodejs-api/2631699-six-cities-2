import { ParamsDictionary } from 'express-serve-static-core';
import { City } from '../../../types/index.js';

export type ParamCityId = {
  city: City;
} | ParamsDictionary;
