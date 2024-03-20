import { IsString } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    name :string


    
}
