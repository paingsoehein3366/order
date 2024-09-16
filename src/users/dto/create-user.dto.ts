import { IsEmail, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateUserDto {
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsString()
  address: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
