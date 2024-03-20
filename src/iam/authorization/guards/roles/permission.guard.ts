import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Roles } from '../../decorators/roles-decrators';
import { Role } from 'src/users/entities/role.entity';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { REQUEST_USERKEY } from 'src/iam/iam.constant';
import { PERMISSIONS_KEY } from '../../decorators/permission.deorators';
import { UsersService} from 'src/users/users.service'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector : Reflector,

    private readonly UsersService :UsersService){}
  async canActivate(

    context: ExecutionContext,
  ): Promise<boolean>  {
    
      const contextPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY,[context.getClass() , context.getHandler()])
      //console.log(contextRoles)
      if(!contextPermissions){return true}

      const user : ActiveUserData =context.switchToHttp().getRequest()[REQUEST_USERKEY]

    const roles : string[] = user.roles;

    let Userroles : string[] = []
    

    const  USerPermissions= await this.UsersService.FindUserPermission(user.sub)


    let result :boolean = false
    USerPermissions.map(USerPermission => {
      contextPermissions.map(contextPermission => {
        console.log(USerPermission)
        
        if(USerPermission === contextPermission ){ result =  true ; }
      });
      
    });
    console.log(result) ;

    return  result
  }
}
