import { IsEmail, IsString, MinLength } from "class-validator"

export class SignUpDto {
    @IsString()
    name : string

    @MinLength(10)
    password : string




}
