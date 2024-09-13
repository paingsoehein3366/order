import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class GetUserQueryDto {
  @IsOptional()
  // @IsInt()
  limit: 10;

  @IsOptional()
  // @IsInt()
  skip: 0;

  @IsOptional()
  @IsString()
  search?: string;
}