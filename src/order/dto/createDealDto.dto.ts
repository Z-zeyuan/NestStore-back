import { IsArray, IsInt, IsString } from "class-validator"

export class createDealDto {

    @IsInt()
    Totalprice : number
    @IsArray()
    GoodsIds : Array<{Id : number,Amount : number}>

   


}