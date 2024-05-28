import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Repository } from 'typeorm';
import { Offer } from 'src/offers/entities/offer.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepository: Repository<Bid>,
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>

  ) { }

  async create(createBidDto: CreateBidDto) {
    //const offer = await this.offersRepository.findOneBy({ id: createBidDto.offer_id })

    console.log(createBidDto)
    //console.log(offer)
    //if (!offer) throw new HttpException('Offer not found', HttpStatus.NOT_FOUND)

    const createdBid = await this.bidsRepository.save({ ...createBidDto })
    return 2;
  }

  findAll() {
    return `This action returns all bids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bid`;
  }

  update(id: number, updateBidDto: UpdateBidDto) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return `This action removes a #${id} bid`;
  }
}
