import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto{

    @IsNotEmpty()
    refreshtoken : string
}