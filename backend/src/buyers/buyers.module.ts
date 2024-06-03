import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [BuyersController],
  providers: [BuyersService],
  imports: [DatabaseModule]
})
export class BuyersModule { }
