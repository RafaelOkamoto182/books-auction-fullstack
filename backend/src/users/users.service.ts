import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username
      }
    })
    if (userAlreadyExists) throw new HttpException("Username already in use", HttpStatus.CONFLICT)

    const hashedPassword = await hash(createUserDto.password, 8)

    return this.usersRepository.save({ ...createUserDto, password: hashedPassword })
  }


  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    delete user.password
    return user;
  }

}
