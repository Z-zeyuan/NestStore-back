import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchandiseDto } from './create-merchandise.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMerchandiseDto extends PartialType(CreateMerchandiseDto) {
    @IsString()
    OldName : string
    @IsString()
    NewName : string

    @IsNumber()
    price : number

    @IsString()
    NewClassName : string

    @IsNumber()
    SellAmount : number

    @IsNumber()
    StockAmount : number


    @IsOptional()
    @IsString()
    GoodDetail : string


}
