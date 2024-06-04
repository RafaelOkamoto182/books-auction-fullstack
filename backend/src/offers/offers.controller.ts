import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) { }

  @Post()
  create(@Body() body: CreateOfferDto) {
    console.log(body)
    const parameters: CreateOfferDto = {
      seller_id: body.seller_id,
      book_name: body.book_name,
      book_author: body.book_author,
      book_genre: body.book_genre,
      desirable_price: body.desirable_price || null
    }

    return this.offersService.create(parameters)
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  /*   @Patch(':id')
    update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
      return this.offersService.update(id, updateOfferDto);
    } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
