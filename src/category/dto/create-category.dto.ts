import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  user_id: number;
}
