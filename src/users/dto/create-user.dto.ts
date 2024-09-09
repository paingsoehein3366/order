import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  id: number;

  // @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @IsString()
  address: string;
}
