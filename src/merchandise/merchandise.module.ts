import { Module } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { MerchandiseController } from './merchandise.controller';
import { GoodsClass } from 'src/merchandise_class/Entities/merchandise_class.entity';
import { Goods } from './entities/merchandise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class_Property } from 'src/merchandise_class/Entities/merchandise_class-property.entity';

@Module({
  imports : [TypeOrmModule.forFeature([GoodsClass , Goods]),TypeOrmModule.forFeature([GoodsClass , Class_Property])],
  controllers: [MerchandiseController],
  providers: [MerchandiseService]
})
export class MerchandiseModule {}
