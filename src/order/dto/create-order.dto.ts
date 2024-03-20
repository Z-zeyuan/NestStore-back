import { IS_DATE, IsArray, IsDate, IsInt, IsMilitaryTime, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsInt()
    userId : number

    @IsString()
    OrderTime : string


    @IsArray()
    GoodsIds : Array<number>

   


}
