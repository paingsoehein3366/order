import { Max } from "class-validator";

export class productQueryDto {
  limit?: number;

  skip?: number;

  search?: string;
}