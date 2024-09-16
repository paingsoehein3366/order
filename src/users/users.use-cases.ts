import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@Injectable()
export class UsersUseCase {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto)
  }

  async findAll(query: GetUserQueryDto) {
    return await this.userService.findAll(query);
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
