import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Sale } from "./entities/sale.entity";
import { In, Repository } from "typeorm";
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }
  async create(createSaleDto: CreateSaleDto) {
    const { product_id, user_id, total_amount, customer_id } = createSaleDto;
    if (!user_id) {
      throw new BadRequestException(
        "You are not authorized to access this resource",
      );
    }
    const product = await this.productRepository.find({
      where: { id: In(product_id) },
    });
    const productName = product.map((p) => p.name).toString();
    if (!product.length) {
      throw new BadRequestException("Product not found");
    }
    return productName;
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
