import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { DatabaseService } from 'src/database/database.service';
import { sellersQuery } from './sellers.query';
import { hash } from 'bcrypt';


@Injectable()
export class SellersService {
  constructor(private readonly dbService: DatabaseService) { }

  async create(parameters: CreateSellerDto) {

    const { queryText: findByNameQueryText, queryValues: findByNameQueryValues } = sellersQuery.selectByUserName(parameters.username)
    const [userNameAlreadyExists] = await this.dbService.executeQuery(findByNameQueryText, findByNameQueryValues)

    if (userNameAlreadyExists)
      throw new HttpException("Username already in use", HttpStatus.CONFLICT)

    const password_hash = await hash(parameters.password, 8)
    parameters.password = password_hash

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
