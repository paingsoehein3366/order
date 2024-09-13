import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Session() session: any) {
    console.log('createCategoryDto: ', createCategoryDto);

    const user_id = session.userId
    console.log('session: ', user_id);

    const category = this.categoryService.create(createCategoryDto, user_id);

    return category;
  }

  @Get()
  findAll(@Query() query: any) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(parseInt(id), updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(parseInt(id));
  }
}
