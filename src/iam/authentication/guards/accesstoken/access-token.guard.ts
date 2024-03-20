import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwkKeyExportOptions } from 'crypto';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/iam/config/jwt.config';
import { REQUEST_USERKEY } from 'src/iam/iam.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
constructor(private readonly jwtservice : JwtService ,  
  @Inject(jwtConfig.KEY) 
  private readonly jwtconfi : ConfigType<typeof jwtConfig>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)
    if(!token){throw new UnauthorizedException()}

    try {
      const payload = await this.jwtservice.verifyAsync(token , this.jwtconfi)
      req[REQUEST_USERKEY] = payload;
      //console.log(payload)
    } catch (error) {
      throw new UnauthorizedException()
    }
    
    return true;
  }


extractTokenFromHeader(req : Request ) : string | undefined{
  const[_, token] = req.headers.authorization?.split(' ')??  [] ;
  return token
}

}
