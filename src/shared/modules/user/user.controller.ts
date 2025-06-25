import {
  inject,
  injectable,
} from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpMethod,
  HttpError,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import {
  Config,
  RestSchema,
} from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './login-user-request.type.js';
import { UserEntity } from './user.entity.js';
import { LoginUserRdo } from './rdo/login-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.checkAuth });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout });
    this.addRoute({ path: '/avatar', method: HttpMethod.Post, handler: this.loadAvatar });
  }

  private async getUser(email: string): Promise<UserEntity | null> {
    return await this.userService.findByEmail(email);
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const userExists = await this.getUser(body.email);

    if (userExists) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    this.ok(res, fillDTO(LoginUserRdo, user));
  }

  public async checkAuth(
    { body }: Request,
    res: Response,
  ): Promise<void> {
    const user = await this.getUser(body.email);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    this.ok(res, fillDTO(UserRdo, user));
  }

  public async logout(
    { body }: Request,
    res: Response,
  ): Promise<void> {
    const user = await this.getUser(body.email);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    this.noContent(res);
  }

  public async loadAvatar(
    { body }: Request,
    res: Response,
  ): Promise<void> {
    const user = await this.getUser(body.email);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    this.ok(res);
  }
}
