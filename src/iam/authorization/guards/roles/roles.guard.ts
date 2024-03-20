import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Roles } from '../../decorators/roles-decrators';
import { Role } from 'src/users/entities/role.entity';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { REQUEST_USERKEY } from 'src/iam/iam.constant';
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector : Reflector){
    super();
  }
  canActivate(

    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
      const contextRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[context.getClass() , context.getHandler()])
      //console.log(contextRoles)
      if(!contextRoles){return true}

      const user : ActiveUserData =context.switchToHttp().getRequest()[REQUEST_USERKEY]

    const roles : string[] = user.roles;

    let Userroles : string[] = []
    
    
    roles.forEach(element => {
      //???
      Userroles.push(element)
    });
    let result :boolean = false
    Userroles.forEach(Userrole => {
      contextRoles.forEach(contextRole => {
        //console.log(Userrole)
        
        if(Userrole === contextRole ){ result=  true ; }
      });
      
    });
    console.log(result) ;

    return result
  }
}
