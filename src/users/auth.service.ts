import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const users = await this.usersRepository.findDublicateUser({ email });
    if (users) {
      throw new BadRequestException('Email already exists')
    }
    const salt = randomBytes(16).toString('hex');
    const hash = await scrypt(password, salt, 64);

    const result = salt + '.' + hash;
    return await this.usersService.create({ ...createUserDto, password: result });
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersRepository.findDublicateUser({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const [salt, oldHash] = user.password.split('.');
    const hash = await scrypt(password, salt, 64);
    if (oldHash == hash) {
      return user;
    } else {
      throw new BadRequestException('Invalid password');
    }
  }
}
