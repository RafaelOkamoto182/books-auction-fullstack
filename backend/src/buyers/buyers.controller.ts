import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) { }

  @Post()
  create(@Body() body: CreateBuyerDto) {

    const parameters: CreateBuyerDto = {
      username: body.username,
      password: body.password,
      user_type: body.user_type
    }

    return this.buyersService.create(parameters);
  }

  @Get()
  findAll() {
    return this.buyersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyersService.update(id, updateBuyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyersService.remove(id);
  }
}
