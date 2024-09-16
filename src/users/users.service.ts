import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@Injectable()
export class UsersService {
  constructor(private userRepositery: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepositery.findDublicateUser({ email });
    console.log('userservice: ', user)
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return await this.userRepositery.create(createUserDto);
  }

  async findAll(query: GetUserQueryDto) {
    const { skip, limit, search } = query;
    return await this.userRepositery.findAll(skip, limit, search);
  }

  findOne(id: number) {
    return this.userRepositery.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.userRepositery.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.userRepositery.remove(id);
  }
}
