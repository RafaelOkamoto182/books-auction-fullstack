import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SellersController],
  providers: [SellersService],
  imports: [DatabaseModule]
})
export class SellersModule { }
