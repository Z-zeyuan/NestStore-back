import { Role } from "src/users/entities/role.entity";

export interface ActiveUserData{
    sub : number,
    email : string,
    roles : string[]
    permissions : string
}