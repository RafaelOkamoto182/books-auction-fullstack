import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { DatabaseService } from 'src/database/database.service';
import { OffersService } from 'src/offers/offers.service';
import { bidsQuery } from './bids.query';

@Injectable()
export class BidsService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly offersService: OffersService
  ) { }

  async create(parameters: CreateBidDto) {
    const offer = await this.offersService.findOne(parameters.offer_id)

    if (!offer)
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    const { queryText, queryValues } = bidsQuery.create(parameters)

    return this.dbService.executeQuery(queryText, queryValues);
  }

  async findAll() {
    const { queryText } = bidsQuery.select()
    return await this.dbService.executeQuery(queryText);
  }

  async findOne(id: string) {

    const { queryText, queryValues } = bidsQuery.selectById(id)
    const [bid] = await this.dbService.executeQuery(queryText, queryValues)

    if (!bid)
      throw new HttpException('Bid not found', HttpStatus.NOT_FOUND)

    return bid;
  }

  update(id: string, updateBidDto: UpdateBidDto) {
    return `This action updates a #${id} bid`;
  }

  async remove(id: string) {
    const bid = await this.findOne(id)

    if (!bid)
      throw new HttpException('Bid not found', HttpStatus.NOT_FOUND)

    const { queryText, queryValues } = bidsQuery.delete(id)
    return this.dbService.executeQuery(queryText, queryValues)
  }
}
