import configuration from '@core/core/common/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const config = configuration;

  const port = config().port;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const logger = new Logger('MainApp');

  // set prefix global
  app.setGlobalPrefix('api/accounting');
  await app.listen(port, () => {
    logger.log(`listened on port ${port}`);
  });
}
bootstrap();
