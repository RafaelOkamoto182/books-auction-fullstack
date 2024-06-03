import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { DatabaseService } from 'src/database/database.service';
import { buyersQuery } from './buyers.query';
import { hash } from 'bcrypt';

@Injectable()
export class BuyersService {
  constructor(private readonly dbService: DatabaseService) { }

  async create(parameters: CreateBuyerDto) {
    const { queryText: findByNameQueryText, queryValues: findByNameQueryValues } = buyersQuery.selectByUserName(parameters.username)
    const [userNameAlreadyExists] = await this.dbService.executeQuery(findByNameQueryText, findByNameQueryValues)

    if (userNameAlreadyExists)
      throw new HttpException("Username already in use", HttpStatus.CONFLICT)

    const password_hash = await hash(parameters.password, 8)
    parameters.password = password_hash

    const { queryText, queryValues } = buyersQuery.create(parameters)
    const result = await this.dbService.executeQuery(queryText, queryValues)
    return result;
  }

  async findOne(id: string) {
    const { queryText, queryValues } = buyersQuery.selectById(id)
    const [result] = await this.dbService.executeQuery(queryText, queryValues)
    if (!result)
      throw new NotFoundException
    return result;
  }
}
