import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {

    const { queryText, queryValues } = sellersQuery.selectById(id)

    const [result] = await this.dbService.executeQuery(queryText, queryValues)
    if (!result)
      throw new NotFoundException
    return result;
  }

  async findOneByUsername(username: string) {
    const { queryText: findByNameQueryText, queryValues: findByNameQueryValues } = sellersQuery.selectByUserName(username)
    const [seller] = await this.dbService.executeQuery(findByNameQueryText, findByNameQueryValues)
    if (!seller) {
      throw new NotFoundException()
    }
    return seller
  }
}
