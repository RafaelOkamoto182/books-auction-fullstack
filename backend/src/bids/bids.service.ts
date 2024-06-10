import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { OutputCreateBidDto } from './dto/create-bid.dto';
import { DatabaseService } from 'src/database/database.service';
import { OffersService } from 'src/offers/offers.service';
import { bidsQuery } from './bids.query';
import { outputGetBidDto } from './dto/get-bid.dto';
import { Role } from 'src/authorization/enums/role.enum';

@Injectable()
export class BidsService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly offersService: OffersService
  ) { }

  async create(parameters: OutputCreateBidDto) {
    const offer = await this.offersService.findOne(parameters.offer_id)

    if (!offer)
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    try {

      const { queryText, queryValues } = bidsQuery.create(parameters)
      return this.dbService.executeQuery(queryText, queryValues);

    } catch (error) {
      return error
    }
  }

  async find(parameters: outputGetBidDto) {
    if (parameters.role === Role.Buyer) {
      return await this.findBidsByBuyerId(parameters)
    }

    if (parameters.role === Role.Seller) {
      return await this.findBidsBySellerId(parameters)

    } else {
      throw new UnauthorizedException
    }

  }

  async findOne(id: string) {

    const { queryText, queryValues } = bidsQuery.selectById(id)
    const [bid] = await this.dbService.executeQuery(queryText, queryValues)

    if (!bid)
      throw new HttpException('Bid not found', HttpStatus.NOT_FOUND)

    return bid;
  }

  async remove(id: string) {
    const bid = await this.findOne(id)

    if (!bid)
      throw new HttpException('Bid not found', HttpStatus.NOT_FOUND)

    const { queryText, queryValues } = bidsQuery.delete(id)
    return this.dbService.executeQuery(queryText, queryValues)
  }

  private async findBidsByBuyerId(parameters: outputGetBidDto) {
    try {
      const { queryText, queryValues } = bidsQuery.selectByBuyerId(parameters.sub)
      const result = await this.dbService.executeQuery(queryText, queryValues)
      return result

    } catch (error) {
      return error
    }

  }

  private async findBidsBySellerId(parameters: outputGetBidDto) {

    try {
      const { queryText, queryValues } = bidsQuery.selectBySellerId(parameters.sub)
      const result = await this.dbService.executeQuery(queryText, queryValues)
      return result

    } catch (error) {
      return error
    }

  }
}
