import { IsArray, IsString } from "class-validator";

export class FindRoleDto {
    @IsString()
    name : string

   
}
