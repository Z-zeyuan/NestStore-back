import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcriptService } from './hashing/bcript.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { config } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './authentication/guards/accesstoken/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { RefreshTokensIdStorage } from './authentication/refresh-tokens-id.storage/refresh-tokens-id.storage';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
import { PermissionsGuard } from './authorization/guards/roles/permission.guard';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ApiKeyService } from './authentication/api-key.service';

@Module({
  imports : [TypeOrmModule.forFeature([User,Role]) , 
  JwtModule.registerAsync(jwtConfig.asProvider()) , 
  ConfigModule.forFeature(jwtConfig),UsersModule
],
  providers: [{
    provide :HashingService,
    useClass : BcriptService}, AuthenticationService,
  {
    provide :APP_GUARD ,
    useClass : AuthenticationGuard
  } ,
  {
     provide :APP_GUARD ,
     useClass : PermissionsGuard
   } ,
   
AccessTokenGuard,
RefreshTokensIdStorage,
ApiKeyService],
  controllers: [AuthenticationController],
})
export class IamModule {}
