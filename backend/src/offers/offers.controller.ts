import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { InputCreateOfferDto, OutputCreateOfferDto } from './dto/create-offer.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/enums/role.enum';
import { OutputGetOfferDto } from './dto/get-offers.dto';
import { SearchCategory } from './enums/search-category';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Seller)
  @Post()
  create(@Body() body: InputCreateOfferDto, @Req() req: any) {
    const parameters: OutputCreateOfferDto = {
      seller_id: req.user.sub,
      book_name: body.book_name,
      book_author: body.book_author,
      book_genre: body.book_genre,
      desirable_price: body.desirable_price || null
    }

    return this.offersService.create(parameters)
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Seller, Role.Buyer)
  find(
    @Req() req: any,
    @Query() query: any
  ) {
    const parameters: OutputGetOfferDto = {
      sub: req.user.sub,
      role: req.user.role,
      page: query.page || 1,
      search_text: `%${query.search_text}%` || "",
      search_by: query.search_by || SearchCategory.Title
    }

    return this.offersService.find(parameters);
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
