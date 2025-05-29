import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { HttpMethod } from './types/http-method.enum.js';

export interface Route {
  path: string,
  method: HttpMethod,
  handler: (request: Request, response: Response, next: NextFunction) => void,
}

