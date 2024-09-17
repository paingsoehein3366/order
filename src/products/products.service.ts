import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { productQueryDto } from "./dto/product-query.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto, user_id: number) {
    if (!user_id) {
      throw new BadRequestException("You are not authorized to access this resource");
    }
    createProductDto.user_id = user_id;

    return await this.productRepository.save(createProductDto);
  }

  async findAll(query: productQueryDto, user_id: number) {
    if (!user_id) {
      throw new BadRequestException("You are not authorized to access this resource");
    }
    const { skip, limit, search } = query;
    const whereCondition: FindOptionsWhere<Product>[] = []
    if (user_id) {
      whereCondition.push({ user_id })
    }
    if (search) {
      whereCondition.push({ name: search })
    }
    const [data, count] = await this.productRepository.findAndCount({
      take: limit,
      skip: skip,
      where: whereCondition,
      order: { 'createdAt': "DESC" },
      relations: ["category"],
    });
    return { data, count };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    Object.assign(updateProductDto, product);
    return await this.productRepository.save(updateProductDto);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    return await this.productRepository.remove(product);
  }
}
