import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  id: number;

  @IsOptional()
  user_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string
}
