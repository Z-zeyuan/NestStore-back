import { IsString } from "class-validator"


export class UpdateUserRole {


    @IsString()
    username : string

    @IsString()
    rolename : string
}
