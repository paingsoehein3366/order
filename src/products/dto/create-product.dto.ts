import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsOptional()
  userId: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;
}
