import { SetMetadata } from "@nestjs/common"
import { AuthType } from "../enums/auth-type-enum"

export const Auth_Type_key='AuthType'









export const Auth = (...authtypes : AuthType[])  => 
    SetMetadata(Auth_Type_key ,authtypes )