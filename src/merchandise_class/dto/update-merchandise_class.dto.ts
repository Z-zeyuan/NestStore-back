import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchandiseClassDto } from './create-merchandise_class.dto';

export class UpdateMerchandiseClassDto extends PartialType(CreateMerchandiseClassDto) {}
