import {
  Response,
  Router,
} from 'express';
import { Route } from '../types/route.interface.js';

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  send<T>(response: Response, statusCode: number, data: T): void;
  ok<T>(response: Response, data: T): void;
  created<T>(response: Response, data: T): void;
  noContent<T>(response: Response, data: T): void;
}
