import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Injectable()
export class UsersUseCase {
  constructor(private userService: UsersService) { }
  async create(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
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