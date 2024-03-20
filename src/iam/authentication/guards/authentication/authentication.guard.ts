import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../accesstoken/access-token.guard';
import { AuthType } from '../../enums/auth-type-enum';
import { Auth_Type_key } from '../../decorators/auth.decorators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  
  private static readonly DefaultAuthoType = AuthType.Bearer;
    private readonly AuthoTypeGuardMap : Record<AuthType , CanActivate | CanActivate[] >
      = {
        [AuthType.Bearer] : this.AccessTokenguard ,
        [AuthType.None] : {canActivate : () => true}
      } 
  
  
  constructor( 
    


    private readonly reflector : Reflector,
    private readonly AccessTokenguard : AccessTokenGuard
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const authTypes = this.reflector.getAllAndOverride<AuthType[]> (
      Auth_Type_key , [context.getHandler(),context.getClass()]
    ) ?? [AuthenticationGuard.DefaultAuthoType]

    const guards = authTypes.map((type) => (this.AuthoTypeGuardMap[type])).flat()

    let errr = new UnauthorizedException()

    for (const instance of guards) {
      const canActivate =  await Promise.resolve(
        instance.canActivate(context)
      ).catch((err) => {errr =err})

      if(canActivate) return true ;

      
    }

    throw errr


    return true;
  }
}
