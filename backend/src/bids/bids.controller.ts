import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Req, Query } from '@nestjs/common';
import { BidsService } from './bids.service';
import { InputCreateBidDto, OutputCreateBidDto } from './dto/create-bid.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/enums/role.enum';
import { outputGetBidDto } from './dto/get-bid.dto';

@Controller('bids')
export class BidsController {

  constructor(private readonly bidsService: BidsService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Buyer)
  create(@Body() body: InputCreateBidDto, @Request() req) {
    const parameters: OutputCreateBidDto = {
      offer_id: body.offer_id,
      buyer_id: req.user.sub,
      bid_amount: body.bid_amount
    }
    return this.bidsService.create(parameters)
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Buyer, Role.Seller)
  find(
    @Req() req: any,
    @Query() query: any
  ) {
    const parameters: outputGetBidDto = {
      sub: req.user.sub,
      role: req.user.role,
      page: query.page || 1
    }
    return this.bidsService.find(parameters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(id);
  }

  /*   @Patch(':id')
    update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
      return
    } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(id);
  }
}
