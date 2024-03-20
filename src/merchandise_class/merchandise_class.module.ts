import { Module } from '@nestjs/common';
import { MerchandiseClassService } from './merchandise_class.service';
import { MerchandiseClassController } from './merchandise_class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class_Property } from './Entities/merchandise_class-property.entity';
import { GoodsClass } from './Entities/merchandise_class.entity';

@Module({
  imports : [TypeOrmModule.forFeature([GoodsClass , Class_Property])],
  controllers: [MerchandiseClassController],
  providers: [MerchandiseClassService]
})
export class MerchandiseClassModule {}
