
import { IsString } from 'class-validator';

export class UpdatePermissionDto {
    @IsString()
    rolename : string

    @IsString()
    permission : string
}
