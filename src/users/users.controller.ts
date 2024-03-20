import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { SignInDto } from 'src/iam/authentication/dto/sign-in.dto/sign-in.dto';
import { Permissions } from 'src/iam/authorization/decorators/permission.deorators';
import { Roles } from 'src/iam/authorization/decorators/roles-decrators';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { UpdateRoleRouter } from './dto/update-role-detail';
import { FindRoleDto } from './dto/FindRole.dto';
import { UserUpdateRoleDto } from './dto/UserUpdateRole.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Roles('Root')
  @Post('createAdmin')
  create(@Body() createUserDto: SignInDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  @Post()
  @Roles('Root')
  createRegular(@Body() createUserDto: SignInDto) {
    return this.usersService.createRegular(createUserDto);
  }


  @Roles('Root')
  @Post('createUserDirectly')
  CreateUserDirectly(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('GetAllRoles')
  GetAllRoles() {
    return this.usersService.GetAllRoles();
  }
  
  @Post('user-roles')
  FindUserRole(@Body() createUserDto: FindRoleDto) {
    return this.usersService.FindUserRole(createUserDto.name);
  }

  @Get()
  findAllAdmin() {
    return this.usersService.findAllAdmin();
  }

  @Get('AllUser')
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Patch('RoleUpdate')
  update( @Body() UpdateRoleR : UpdateRoleRouter) {
    return this.usersService.update(UpdateRoleR);
  }

  @Patch('UserUpdateRole')
  UserUpdateRole( @Body() UserUpdateRoleDto : UserUpdateRoleDto) {
    return this.usersService.UserUpdateRole(UserUpdateRoleDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
