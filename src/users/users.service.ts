import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from '../iam/authentication/dto/sign-up.dto/sign-up.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { promises } from 'stream';
import { HashingService } from 'src/users/hashing/hashing.service';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { error } from 'console';
import { UpdateRoleRouter } from './dto/update-role-detail';
import { RouterDb } from 'src/router-db/entities/router-db.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdateRoleDto } from './dto/UserUpdateRole.dto';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userrepo: Repository<User>,
    @InjectRepository(Role)
    private readonly rolerepo: Repository<Role>,
    @InjectRepository(Role)
    private readonly routerRepo: Repository<RouterDb>,
    private readonly connection: Connection,
    private readonly Hashservr: HashingService,
  ) { }


  async GetAllRoles() {
    return await this.rolerepo.find()
  }

  async createRegular(createUserDto: SignUpDto) {
    try {
      const RegularRole = await this.rolerepo.findOne({ where: { name: 'Regular' } })
      const coffeeToAdd = this.userrepo.create({
        ...createUserDto,
        roles: [RegularRole]
      })
      return this.userrepo.save(coffeeToAdd)
    } catch (error) {
      const createExist = '23505'
      if (error.code === createExist) { throw new ConflictException() }
      throw error;
    }


  }
  async createAdmin(createUserDto: SignUpDto) {

    const RegularRole = await this.rolerepo.findOne({ where: { name: 'Root' } })

    try {
      const user = new User();

      user.name = createUserDto.name;

      user.password = await this.Hashservr.hash(createUserDto.password);
      user.roles = [RegularRole]
      await this.userrepo.save(user)

    } catch (err) {
      const createExist = '23505'
      if (err.code === createExist) { throw new ConflictException() }
      throw err;
    }

  }

  async createUser(createUserDto: CreateUserDto){
    let RoleList : Role[] = []
    await createUserDto.RoleNames.map(
      async (RoleName)=>{
        let RegularRole = await this.rolerepo.findOne({ where: { name: RoleName} })
        RoleList.push(RegularRole)
      }
    )
    

    try {
      const user = new User();

      user.name = createUserDto.name;

      user.password = await this.Hashservr.hash(createUserDto.password);
      user.roles = RoleList
      await this.userrepo.save(user)

    } catch (err) {
      const createExist = '23505'
      if (err.code === createExist) { throw new ConflictException() }
      throw err;
    }

  }

  async findAllAdmin() {
    try {
      return this.userrepo.find(
        {
          where: {
            roles: [await this.rolerepo.findOne(
              { where: { name: 'Root' } })]
          },
          relations: ['roles'],
        });

    } catch (error) {

    }
   
  }

  async findAllUser(){
    try {
      return this.userrepo.find(
        {
          
          relations: ['roles'],
        });

    } catch (error) {

    }
  }

  async findOne(name: string) {

    try {
      const user = await this.userrepo.findOne({
        where: { name: name },
        relations: ['roles']
      },
      );
      if (!user) {
        throw new NotFoundException(`user # ${name} not found hhub`);
      }
      return true;
    } catch (error) {
      throw error
    }

  }

  async findOneById(id: number) {

    try {
      const user = await this.userrepo.findOne({
        where: { id: +id },
        relations: ['roles']
      },
      );
      if (!user) {
        throw new NotFoundException(`user # ${id} not found hhub`);
      }
      return user;
    } catch (error) {
      throw error
    }

  }

  async update(UpdateRoleR: UpdateRoleRouter) {
    try {
      let role = await this.rolerepo.findOne({where : { name : UpdateRoleR.rolename}})
      const routers = [];
      UpdateRoleR.RouterNames.map(
        async (routerName) => {
          let router = await this.routerRepo.findOne({where : { name : routerName}})
          routers.push(router)
        }
      )
      role.AccessableRouter = routers
  
  
      return await this.rolerepo.save(role)
    } catch (error) {
      throw error
      
    }
  }

  async remove(username: string) {
    try {
      const UserToKill = await this.userrepo.findOne({ where: { name: username } });
      if(UserToKill)
      {
        return this.userrepo.remove(UserToKill);
      }
      
    } catch (error) {
      throw error
    }

  }

  async findRolePermission(name: string) {
    try {
      const role = await this.rolerepo.findOne(
        {
          where: { name: name },
          relations: ['Permission']
        },

      );
      if (!role) {
        throw new NotFoundException(`role  ${name} not found hhub`);
      }
      return role.Permission;
    } catch (error) {
      throw error
    }

  }
  async FindUserRole(name: string) {
    try {
      const user = await this.userrepo.findOne(
        {
          where: { name: name },
          relations: ['roles']
        },

      );
      if (!user) {
        throw new NotFoundException(`role  ${name} not found hhub`);
      }
      let roleList :string[]= []
      user.roles.map(r => {roleList.push(r.name)})
      return {'roles' : `${roleList}`};
    } catch (error) {
      throw error
    }

  }

  async FindUserPermission(id: number): Promise<string[]> {
    try {
      const user = await this.findOneById(id);
      let Roles = (user).roles;
      let Permissions: string[] = []

      const a = Roles.map(async Role => {
        let perm1 = await this.findRolePermission(Role.name)

        console.log(perm1)
          ; (perm1).map(permission => {
            console.log(permission.name)
            Permissions.push(permission.name)
          });
      });

      await Promise.all(a)

      console.log(Permissions)

      return Permissions
    } catch (error) {
      throw error
    }

  }


  async GiveUserRole(updateUserRoleDto: UpdateUserRole) {

    try {
      const user = await this.userrepo.findOne(
        {
          where: { name: updateUserRoleDto.username },
          relations: ['roles']
        },

      );


      let ExistRole = await this.rolerepo.findOne(
        { where: { name: updateUserRoleDto.rolename } },)
      if (!ExistRole) {
        let NewRole = new Role()
        NewRole.name=updateUserRoleDto.rolename
        user.roles.push(NewRole)
        return this.userrepo.save(user)
        //throw new Error("No Such Role , Please create Role First");
      }
      else {
        user.roles.push(ExistRole)
        return this.userrepo.save(user)
      }

    } catch (error) {
      throw error

    }

  }


  async RemoveUserRole(updateUserRoleDto: UpdateUserRole) {
    try {
      const user = await this.userrepo.findOne(
        {
          where: { name: updateUserRoleDto.username },
          relations: ['roles']
        },)

      let NewRoles = []
      user.roles.forEach(r => {
        if (r.name !== updateUserRoleDto.rolename) { NewRoles.push(r) }
      });

      user.roles = NewRoles
      return await this.userrepo.save(user)
    } catch (error) {
      throw error
    }

  }

  async UserUpdateRole(UserUpdateRoledto : UserUpdateRoleDto){
    const UserToModify =   await this.userrepo.findOne(
      {
        where : {name : UserUpdateRoledto.name},
        relations: ['roles']
      },)


      let roleArr = []
      await UserUpdateRoledto.roleNames.map(
        async (RoleName) => {
          let Role =await this.rolerepo.findOne({where: { name: RoleName },})
          roleArr.push(Role)
        }
      )
      UserToModify.roles = roleArr
      return await this.userrepo.save(UserToModify)
  }

}


