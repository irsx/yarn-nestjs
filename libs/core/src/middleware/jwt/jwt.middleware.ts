/* eslint-disable no-param-reassign */
import configuration from '@core/core/common/configuration';
import { UnauthorizedError } from '@core/core/providers/error-provider';
import type { NestMiddleware } from '@nestjs/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import type { Request, Response } from 'express';
import { custom, Issuer } from 'openid-client';

import type { JwtPayload } from './dto/jwt-payload.dto';
import { ErrorContextNameEnum } from 'src/middleware/dto/common';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  @Inject(configuration.KEY)
  private readonly config: ConfigType<typeof configuration>;

  private readonly logger = new Logger(JwtMiddleware.name);

  async use(req: Request, _res: Response, next: Function) {
    const authHeader = req.headers.authorization;
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const token = authHeader.split(' ')[1];

      try {
        this.logger.debug(`🔥 H2H : ${this.config.discoveryUrl}`);
        const discovery = await Issuer.discover(this.config.discoveryUrl);
        const clientOidc = new discovery.Client({
          client_id: this.config.discoveryClientId,
          client_secret: this.config.discoveryClientSecret,
        });

        clientOidc[custom.clock_tolerance] = 10;
        const userInfo: JwtPayload = await clientOidc.userinfo(token);

        req.session = userInfo;
        req.userId = userInfo.sub;
        req.accessToken = token;
      } catch (err) {
        this.logger.error(`❌ ${err?.message}`);
        throw new UnauthorizedError(err.message || 'Session Expired');
      }
    } else {
      this.logger.error('Access Token Requeired', [
        ErrorContextNameEnum.E_JWT_ERROR,
      ]);
      throw new UnauthorizedError('Access Token Required');
    }
    next();
  }
}
