import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { DatabaseService } from 'src/database/database.service';
import { sellersQuery } from './sellers.query';


@Injectable()
export class SellersService {
  constructor(private readonly dbService: DatabaseService) { }

  async create(parameters: CreateSellerDto) {

    const { queryText, queryValues } = sellersQuery.create(parameters)
    const result = await this.dbService.executeQuery(queryText, queryValues)
    return result;
  }

  findAll() {
    return `This action returns all sellers`;
  }

  async findOne(id: string) {
    const { queryText, queryValues } = sellersQuery.selectById(id)
    const [result] = await this.dbService.executeQuery(queryText, queryValues)
    return result;
  }

  update(id: string, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: string) {
    return `This action removes a #${id} seller`;
  }
}
