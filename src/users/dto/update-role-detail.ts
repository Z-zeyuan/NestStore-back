import { IsArray, IsString } from "class-validator"


export class UpdateRoleRouter {


    @IsString()
    rolename : string

    @IsArray()
    RouterNames : string[]
}
