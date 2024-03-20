import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { PermissionModule } from './permission/permission.module';
import { ApiKey } from './entities/api-ket.entity/api-key.entity';
import { BcriptService } from 'src/users/hashing/bcript.service';
import { HashingService } from './hashing/hashing.service';
import { RouterDb } from 'src/router-db/entities/router-db.entity';
import { Deal } from 'src/order/entities/Deal.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User , Role]), 
  TypeOrmModule.forFeature([Role , Permission]) ,
  TypeOrmModule.forFeature([Role , RouterDb]) ,
  TypeOrmModule.forFeature([User , ApiKey]) , PermissionModule, 
  TypeOrmModule.forFeature([User,Deal]) ],
  
  controllers: [UsersController],
  providers: [UsersService , {
    provide :HashingService,
    useClass : BcriptService}],
  exports : [UsersService]
})
export class UsersModule {}
