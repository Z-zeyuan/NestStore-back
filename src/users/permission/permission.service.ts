import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    
        @InjectRepository(Permission)
        private readonly permissionrepo : Repository<Permission>,
        @InjectRepository(Role)
        private readonly rolerepo : Repository<Role>,
        private readonly connection : Connection,
  ){}


  async findRolePermission(name: string) {
    const role= await this.rolerepo.findOne(
      {where : {name:name} , 
      relations : ['Permission']
      },
      
       );
     if(!role){
      throw new NotFoundException(`role  ${name} not found hhub` );
     }
      return role.Permission;
    }
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  async GivePermission(updatePermissionDto: UpdatePermissionDto) {
    try {
      const role = await this.rolerepo.findOne(
        { where: { name: updatePermissionDto.rolename } })
        role.Permission.forEach(p => {
          if(p.name === updatePermissionDto.permission)
          {throw new Error("Role Already Have the Peermission");
          }
        });
        const permission =await this.permissionrepo.findOne({ where: { name: updatePermissionDto.permission } })
        if(!permission){throw new Error("Permission Not Exist");
        }
        role.Permission.push(permission)
       this.rolerepo.save(role)
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
