import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
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
      throw new BadRequestException("User not found");
    }
    createProductDto.user_id = user_id;
    console.log("createProductDto: ", createProductDto);

    return await this.productRepository.save(createProductDto);
  }

  async findAll(query: productQueryDto) {
    const { skip, limit, search } = query;
    const [data, count] = await this.productRepository.findAndCount({
      take: limit,
      skip: skip,
      where: search ? { name: search } : undefined,
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
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    return await this.productRepository.remove(product);
  }
}
