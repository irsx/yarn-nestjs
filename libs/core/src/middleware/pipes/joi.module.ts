import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { JoiPipe } from './joi.pipe';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: JoiPipe,
    },
  ],
})
export class JoiModule {}
