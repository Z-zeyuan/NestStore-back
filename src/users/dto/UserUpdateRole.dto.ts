import { IsArray, IsString } from "class-validator";

export class UserUpdateRoleDto {
    @IsString()
    name : string

    @IsArray()
    roleNames : string[]

   
}
