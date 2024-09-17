import { IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateSaleDto {
  @IsArray()
  product_id: number[];

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsNumber()
  total_amount: number;

  @IsOptional()
  @IsNumber()
  customer_id?: number;
}
