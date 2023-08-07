import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './common/configuration';
import { environments } from './common/enviroments';
import { CoreService } from './core.service';
import { AllExceptionsFilter } from './middleware/exception/all.exception';
import { LoggingInterceptor } from './middleware/interceptor/logger.interceptor';
import { JoiModule } from './middleware/pipes/joi.module';
import { TypeOrmConfigService } from './typeorm/typeorm-service';

@Module({
  imports: [
    JoiModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: environments[process.env.NODE_ENV] || '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [
    CoreService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [CoreService],
})
export class CoreModule {}
