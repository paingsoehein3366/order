import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsOptional()
  user_id: number;

  @IsNumber()
  category_id: number;

  @IsNumber()
  price: number;

  @IsNumber()
  product_total: number;

  @IsString()
  expire_date: string;
}
