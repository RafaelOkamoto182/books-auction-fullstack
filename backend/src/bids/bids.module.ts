import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Module({
  controllers: [BidsController],
  providers: [BidsService],
  imports: [TypeOrmModule.forFeature([Bid, Offer])]
})
export class BidsModule { }
