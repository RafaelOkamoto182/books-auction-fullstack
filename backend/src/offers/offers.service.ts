import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { DatabaseService } from 'src/database/database.service';
import { offersQuery } from './offers.query';

@Injectable()
export class OffersService {
  constructor(
    private readonly dbService: DatabaseService) { }

  async create(parameters: CreateOfferDto) {

    const { queryText, queryValues } = offersQuery.create(parameters)
    const result = await this.dbService.executeQuery(queryText, queryValues)
    return result;
  }

  async findAll() {
    const { queryText } = offersQuery.select()

    const result = await this.dbService.executeQuery(queryText)
    return result;
  }

  async findOne(id: string) {

    const { queryText, queryValues } = offersQuery.selectById(id)
    const [offer] = await this.dbService.executeQuery(queryText, queryValues)

    if (!offer)
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    return offer;
  }

  /*   async update(id: string, updateOfferDto: UpdateOfferDto) {
      const offer = await this.offersRepository.findOneBy({ id })
  
      if (!offer) throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)
  
      this.offersRepository.merge(offer, updateOfferDto)
      return this.offersRepository.save(offer)
    } */

  async remove(id: string) {

    const offer = await this.findOne(id)

    if (!offer)
      throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    const { queryText, queryValues } = offersQuery.delete(id)

    return this.dbService.executeQuery(queryText, queryValues)
  }
}
