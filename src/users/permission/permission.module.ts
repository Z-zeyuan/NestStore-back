import { Module, NotFoundException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User , Role]), TypeOrmModule.forFeature([Role , Permission])],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {
  
  















}
