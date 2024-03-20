import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerchandiseClassService } from './merchandise_class.service';
import { CreateMerchandiseClassDto } from './dto/create-merchandise_class.dto';
import { UpdateMerchandiseClassDto } from './dto/update-merchandise_class.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-type-enum';

@Controller('merchandise-class')
export class MerchandiseClassController {
  constructor(private readonly merchandiseClassService: MerchandiseClassService) {}

  @Post()
  create(@Body() createMerchandiseClassDto: CreateMerchandiseClassDto) {
    return this.merchandiseClassService.createClass(createMerchandiseClassDto);
  }
  @Auth(AuthType.None)
  @Get('findAllClass')
  findAllClass() {
    return this.merchandiseClassService.findAllClass();
  }
  @Get('findAllProperties')
  findAllProperties() {
    return this.merchandiseClassService.findAllClassProperty();
  }
  

  @Get('FindOneClass/:ClassName')
  findOne(@Param('ClassName') ClassName: string) {
    return this.merchandiseClassService.findOneClass(ClassName);
  }

  @Get('FindPropertyOfClass:ClassName')
  findOneClassProperty(@Param('ClassName') ClassName: string) {
    return this.merchandiseClassService.findPropertyofOneClass(ClassName);
  }

  @Patch(':id')
  update(@Param('ClassName') ClassName: string, @Body() updateMerchandiseClassDto: UpdateMerchandiseClassDto) {
    return this.merchandiseClassService.update(updateMerchandiseClassDto);
  }

  @Delete(':ClassName')
  remove(@Param('ClassName') ClassName: string) {
    return this.merchandiseClassService.remove(ClassName);
  }
}
