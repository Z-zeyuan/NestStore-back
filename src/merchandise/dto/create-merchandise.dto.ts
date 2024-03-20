import { IsNumber, IsString } from "class-validator"

export class CreateMerchandiseDto {
    @IsString() 
    name : string

    @IsNumber()
    price : number

    @IsString()
    className: string
}
