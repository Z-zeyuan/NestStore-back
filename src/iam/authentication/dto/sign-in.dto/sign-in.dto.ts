import { IsEmail, IsString, MinLength } from "class-validator"

export class SignInDto {
    @IsString()
    name : string

    @MinLength(10)
    password : string
}
