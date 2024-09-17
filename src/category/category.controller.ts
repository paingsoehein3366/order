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
  BadRequestException,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Session() session: any,
  ) {

    const user_id = session.userId;
    console.log("session: ", user_id);
    if (!user_id) {
      throw new BadRequestException("User not found");
    }
    createCategoryDto.user_id = user_id;
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: any, @Session() session: any) {
    const user_id = session?.userId;
    return this.categoryService.findAll(query, user_id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(parseInt(id));
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(parseInt(id), updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(parseInt(id));
  }
}
