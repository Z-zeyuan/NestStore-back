import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Optional } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { CreateMerchandiseDto } from './dto/create-merchandise.dto';
import { UpdateMerchandiseDto } from './dto/update-merchandise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-type-enum';
import { query } from 'express';
import { PaginationQueryDto } from 'src/COMMON/pagination-query.dto';
import { GetCartDto } from './dto/GetCart.dto';

@Controller('merchandise')
export class MerchandiseController {
  constructor(private readonly merchandiseService: MerchandiseService) {}

  @Post('createNewGood')
  async create(@Body() createMerchandiseDto: CreateMerchandiseDto) {
    return await this.merchandiseService.createGoods(createMerchandiseDto);
  }


  @Auth(AuthType.None)
  @Get('ALL')
  async findAll(@Query() PageDto : PaginationQueryDto){ 
    //console.log('cwdwd')
    if(PageDto.limit || PageDto.offset){
      return await this.merchandiseService.findPagedGoods(PageDto);
    }
    else{
      return await this.merchandiseService.findAllGoods();
    }
    
  }
  @Auth(AuthType.None)
  @Get('FindOneGood/:GoodName')
  async findOneClass(@Param('GoodName') GoodName: string) {
    //console.log(GoodName)
    return await this.merchandiseService.findOneGood(GoodName);
  }
  @Auth(AuthType.None)
  @Get('FindOneGoodById/:GoodName')
  async FindOneGoodById(@Param('Id') Id: number) {
    //console.log(GoodName)
    return await this.merchandiseService.FindOneGoodById(Id);
  }

  @Auth(AuthType.None)
  @Post('FindManyGoodById')
  async FindManyGoodById(@Body() Ids: GetCartDto) {
    return await this.merchandiseService.FindManyGoodById(Ids.Ids);
  }

  @Auth(AuthType.None)
  @Get('FindOneGoodClass/:ClassName')
  async findClassOfGood(@Param('ClassName') ClassName: string, @Query() PageDto : PaginationQueryDto) {
    if(PageDto.limit || PageDto.offset){
      return await this.merchandiseService.findPagedOneClassOfGoods(ClassName,PageDto);
    }
    else{
      return await this.merchandiseService.findOneClassOfGoods(ClassName);
    }
    
    
  }


  @Auth(AuthType.None)
  @Get('FindGoodAmount/:ClassName')
  async FindGoodAmount(@Param('ClassName') ClassName: string) {
    if(ClassName =='ALL'){
      return await this.merchandiseService.FindGoodAmount();
    }
    else{
      return await this.merchandiseService.FindClassGoodAmount(ClassName);
    }
    
    
  }

  @Patch()
  update(@Body() updateMerchandiseDto: UpdateMerchandiseDto) {
      this.merchandiseService.updateGoodInfo( updateMerchandiseDto).then(
      (respond)=> {return respond}
    );
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return await this.merchandiseService.DeleteGood(name);
  }


  @Post('/uploadImg/:GoodName')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/GoodsLableImg/',
      filename: (req, file, cb) => {
        // 在此处自定义保存后的文件名称
        const filename = `${req.params.GoodName}.${file.originalname.split('.')[1]}`;
        return cb(null, filename);
      },
    })}
      ))
  uploadFile(@Param('GoodName') GoodName: string ,@UploadedFile() file: Express.Multer.File) {
    console.log(file.destination.concat(file.filename));

    return file.destination.concat(file.filename)
  }
}
