import { IsArray, IsNumber, IsString } from "class-validator"

export class GetCartDto {
    @IsArray() 
    Ids : number[]

}
