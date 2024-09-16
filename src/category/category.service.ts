import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

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

  async findAll(query) {
    const { skip, limit, search } = query;
    const [data, count] = await this.categoryRepositery.findAndCount({
      order: { createdAt: "DESC" },
      take: limit,
      skip: skip,
      where: search ? { name: search } : undefined,
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
