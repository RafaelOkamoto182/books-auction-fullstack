import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>
  ) { }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const createdOffer = await this.offersRepository.save({ ...createOfferDto })
    return createdOffer;
  }

  async findAll(): Promise<Offer[]> {
    const offers = await this.offersRepository.find()

    return offers;
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOneBy({ id })

    if (!offer) throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.offersRepository.findOneBy({ id })

    if (!offer) throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    this.offersRepository.merge(offer, updateOfferDto)
    return this.offersRepository.save(offer)
  }

  async remove(id: string) {
    const offer = await this.offersRepository.findOneBy({ id })

    if (!offer) throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    return this.offersRepository.delete({ id })
  }
}
