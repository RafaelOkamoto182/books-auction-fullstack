import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OffersModule } from 'src/offers/offers.module';
import { OffersService } from 'src/offers/offers.service';

@Module({
  controllers: [BidsController],
  providers: [BidsService, OffersService],
  imports: [DatabaseModule]
})
export class BidsModule { }
