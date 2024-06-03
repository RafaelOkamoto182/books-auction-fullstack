import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module';
import { BidsModule } from './bids/bids.module';
import { DatabaseModule } from './database/database.module';
import { SellersModule } from './sellers/sellers.module';
import { BuyersModule } from './buyers/buyers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: Number(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        migrationsRun: true,
        migrations: [`${__dirname}/database/migrations/*{.ts,.js}`]
      }),
      inject: [ConfigService]

    }),
    OffersModule,
    BidsModule,
    DatabaseModule,
    SellersModule,
    BuyersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
