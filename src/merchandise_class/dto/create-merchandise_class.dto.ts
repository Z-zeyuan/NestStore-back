import { IsString } from "class-validator";

export class CreateMerchandiseClassDto {
    @IsString()
    name :string


    
}
