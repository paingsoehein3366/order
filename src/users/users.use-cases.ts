import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Injectable()
export class UsersUseCase {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto)
  }

  async findAll() {
    return await this.userService.findAll();
  }

  async findOne(id: number) {
    return await this.userService.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userService.remove(id);
  }
}
