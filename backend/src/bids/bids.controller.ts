import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BidsService } from './bids.service';
import { InputCreateBidDto, OutputCreateBidDto } from './dto/create-bid.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/enums/role.enum';

@Controller('bids')
export class BidsController {

  constructor(private readonly bidsService: BidsService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Buyer)
  @Post()
  create(@Body() body: InputCreateBidDto, @Request() req) {
    const parameters: OutputCreateBidDto = {
      offer_id: body.offer_id,
      buyer_id: req.user.sub,
      bid_amount: body.bid_amount
    }
    return this.bidsService.create(parameters)
  }

  @Get()
  findAll() {
    return this.bidsService.findAll();
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
