import { CoreModule } from '@core/core';
import { JwtMiddleware } from '@core/core/middleware/jwt/jwt.middleware';
import type * as common from '@nestjs/common';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: common.MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/health-check');
  }
}
