import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OutputCreateOfferDto } from './dto/create-offer.dto';
import { DatabaseService } from 'src/database/database.service';
import { offersQuery } from './offers.query';
import { OutputGetOfferDto } from './dto/get-offers.dto';
import { Role } from 'src/authorization/enums/role.enum';
import { SearchCategory } from './enums/search-category';

interface OfferQueryReturn {
  offer_id: string,
  seller_id: string,
  book_name: string,
  book_author: string,
  book_genre: string,
  desirable_price: number | null,
  created_at: string,
  updated_at: string,
}

@Injectable()
export class OffersService {
  constructor(
    private readonly dbService: DatabaseService) { }

  async create(parameters: OutputCreateOfferDto) {

    const { queryText, queryValues } = offersQuery.create(parameters)
    const result = await this.dbService.executeQuery(queryText, queryValues)
    return result;
  }

  async find(parameters: OutputGetOfferDto) {

    if (parameters.role === Role.Buyer) {
      return await this.getOffers(parameters)

    } else if (parameters.role === Role.Seller) {
      return await this.getSellerOffers(parameters)
    }
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

  private async getSellerOffers(parameters: OutputGetOfferDto) {

    const { queryText, queryValues } = offersQuery.selectSellerOffers(parameters.sub)

    const result = await this.dbService.executeQuery(queryText, queryValues)
    return result
  }

  private async getOffers(parameters: OutputGetOfferDto) {

    if (parameters.search_by === SearchCategory.Title) {
      const { queryText, queryValues } = offersQuery.selectOffersByBookTitle(parameters.search_text)
      const result = await this.dbService.executeQuery(queryText, queryValues)

      const formattedResult = this.formatOffersToReturn(result)

      return formattedResult
    }

    if (parameters.search_by === SearchCategory.Author) {
      const { queryText, queryValues } = offersQuery.selectOffersByBookAuthor(parameters.search_text)
      const result = await this.dbService.executeQuery(queryText, queryValues)

      const formattedResult = this.formatOffersToReturn(result)
      return formattedResult
    }

    if (parameters.search_by === SearchCategory.Genre) {
      const { queryText, queryValues } = offersQuery.selectOffersByBookGenre(parameters.search_text)
      const result = await this.dbService.executeQuery(queryText, queryValues)

      const formattedResult = this.formatOffersToReturn(result)
      return formattedResult
    } else {
      throw new HttpException("Use a valid search criteria", HttpStatus.BAD_REQUEST)
    }

  }

  private formatOffersToReturn(offers: OfferQueryReturn[]) {

    const formattedResult = offers.map((entry) => {
      delete entry.desirable_price
      return entry
    })

    return formattedResult
  }
}
