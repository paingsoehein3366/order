import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepositery: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto,) {
    console.log("createCategoryDto: ", createCategoryDto);

    return await this.categoryRepositery.save(createCategoryDto);
  }

  async findAll(query: any, user_id: number) {
    if (!user_id) {
      throw new BadRequestException("You are not authorized to access this resource");
    }
    const { skip, limit, search } = query;
    const whereCondition: FindOptionsWhere<Category>[] = []
    if (user_id) {
      whereCondition.push({ user_id })
    }

    if (search) {
      whereCondition.push({ name: search })
    }
    const [data, count] = await this.categoryRepositery.findAndCount({
      order: { createdAt: "DESC" },
      take: limit,
      skip: skip,
      where: whereCondition,
      relations: ['products'],
    });
    return { data, count };
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException("Category not found");
    }
    return await this.categoryRepositery.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException("Category not found");
    }
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepositery.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException("Category not found");
    }
    return await this.categoryRepositery.delete(id);
  }
}
