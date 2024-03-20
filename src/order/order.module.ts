import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/Order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from 'src/merchandise/entities/merchandise.entity';
import { Deal } from './entities/Deal.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([Order, Deal]),
    TypeOrmModule.forFeature([Goods]),
    TypeOrmModule.forFeature([User, Deal])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
