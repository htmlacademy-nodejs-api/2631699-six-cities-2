import {
  NextFunction,
  Request,
  Response,
} from 'express';

export interface ExceptionFilter {
  catch(error: Error, request: Request, response: Response, next: NextFunction): void;
}
