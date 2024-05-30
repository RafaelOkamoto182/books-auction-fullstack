import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { OffersModule } from './offers/offers.module';
import { Offer } from './offers/entities/offer.entity';
import { BidsModule } from './bids/bids.module';
import { Bid } from './bids/entities/bid.entity';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Offer, Bid],
      synchronize: true
    }),
    UsersModule,
    OffersModule,
    BidsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
