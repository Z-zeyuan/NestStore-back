import { IsArray, IsOptional, IsString } from "class-validator"


export class UpdateRouterAccessDto  {
    @IsString()
    rolename : string
    

    @IsOptional()
    @IsString()
    newName : string

    @IsArray()
    RouterNames : string[]
}
