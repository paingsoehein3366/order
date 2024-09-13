import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository, ILike } from "typeorm";

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    return await this.repo.save(createUserDto);
  }

  async findAll(skip: number, limit: number, search: string) {
    const [data, count] = await this.repo.findAndCount({
      order: { createdAt: "DESC" },
      take: limit,
      skip: skip,
      where: search ? { address: ILike(`%${search}%`) } : undefined,
    });
    return { data, count };
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async findDublicateUser(filter: { email: string }) {
    return await this.repo.findOneBy(filter)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}