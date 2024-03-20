import { IsOptional, IsString } from "class-validator"

export class CreateRouterDbDto {
@IsString()
name : string

@IsOptional()
@IsString()
fathername : string


}
