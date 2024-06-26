import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) { }

  @Post()
  create(@Body() body: CreateSellerDto) {

    const parameters: CreateSellerDto = {
      username: body.username,
      password: body.password,
      user_type: body.user_type
    }

    return this.sellersService.create(parameters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }
}
