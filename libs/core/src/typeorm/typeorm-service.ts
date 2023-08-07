import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import configuration from '../common/configuration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(configuration.KEY)
  private readonly config: ConfigType<typeof configuration>;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.database.type as any,
      host: this.config.database.host,
      port: this.config.database.port,
      database: this.config.database.database,
      username: this.config.database.username,
      password: this.config.database.password,
      entities: [__dirname + '../../../../../**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '../../../../../**/*.subscriber{.ts,.js}'],
      migrations: [__dirname + '../../../../../db/migrations/*{.ts,.js}'],
      migrationsTableName: 'typeorm_migrations',
      logging: process.env.ENV === 'local' ? ['query', 'error'] : ['error'],
      synchronize: false,
    };
  }
}
