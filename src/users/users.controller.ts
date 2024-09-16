import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersUseCase } from './users.use-cases';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCase: UsersUseCase) { }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.userId;
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    console.log('createUserDto: ', createUserDto);
    const user = await this.usersUseCase.create(createUserDto);
    console.log('user: ', user);

    session.userId = user.id;
    return user;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const user = await this.usersUseCase.login(loginUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  whoAmi(@Session() session: any) {
    return this.usersUseCase.findOne(session.userId);
  }

  @Get()
  findAll(@Query() query: GetUserQueryDto) {
    return this.usersUseCase.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersUseCase.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersUseCase.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersUseCase.remove(parseInt(id));
  }
}
