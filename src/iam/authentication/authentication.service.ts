import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { Config } from 'sequelize';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { InvalidRefreshTokenErr, RefreshTokensIdStorage } from './refresh-tokens-id.storage/refresh-tokens-id.storage';
import { randomUUID } from 'crypto';
import { log } from 'console';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly UserRepo : Repository<User> ,
        private readonly Hashservr : HashingService,
        private readonly Jwtservice : JwtService,
        @Inject(jwtConfig.KEY)
        private readonly Jwtconfig : ConfigType<typeof jwtConfig>,
       
        
        private readonly refreshTokenIdStore : RefreshTokensIdStorage
    ){}

    async signUp(SignUpDto : SignUpDto){
        try {
            const user = new User();
    
            user.name = SignUpDto.name;
    
            user.password =  await this.Hashservr.hash(SignUpDto.password) ;
    
            await this.UserRepo.save(user)
        } catch (err) {
            const createExist = '23505'
            if(err.code === createExist){throw ConflictException}
            throw err;
        }
    }


    async signIn(SignInDto : SignInDto){
        const user = await this.UserRepo.findOne( {where : {name : SignInDto.name} , 
            relations : ['roles']
            })



        if(!user){throw new UnauthorizedException("User not exist")}

        const match =await this.Hashservr.compare(SignInDto.password, user.password )

        if(!match){throw new UnauthorizedException("PWD not match")}
        console.log(user)
        const tokens = 
            await this.GeneRateToken(user)
        //const LoginToken = await 
        
        return tokens




        
}

    
    private async GeneRateToken(user: User) {
        
        const refreshTokenId = randomUUID()
        let UserRoleNames : string[] = []
         user.roles.forEach(r => {
            UserRoleNames.push(r.name)
        });
        const [LoginToken , RefreshToken] = await Promise.all([this.SIgnToken<Partial<ActiveUserData>>
            (user.id, this.Jwtconfig.accessTokenttl, { email: user.name , roles :UserRoleNames }), 
                this.SIgnToken(user.id, this.Jwtconfig.refreshTokenttl , {refreshTokenId})]);
            await this.refreshTokenIdStore.insert(user.id , refreshTokenId)
            console.log(await this.refreshTokenIdStore.validate(user.id, refreshTokenId))
        return {LoginToken,RefreshToken}
    }

    async RefreshTokens(  RefreshTokendto :  RefreshTokenDto ){
        try {
            //console.log(RefreshTokendto.refreshtoken)\
            //?????

            const {sub , refreshTokenId} = await this.Jwtservice.verifyAsync<
            Pick<ActiveUserData , 'sub'> & {refreshTokenId : string}
            >(RefreshTokendto.refreshtoken ,{
                secret : this.Jwtconfig.secret,
                audience:this.Jwtconfig.audience,
                issuer : this.Jwtconfig.issuer
            } )
            //console.log(refreshTokenId)
            

            const user = await this.UserRepo.findOne(
                {where : {id: sub} , 
                relations : ['roles']
                },
            )

            console.log(user.name)
            const IsValid = await this.refreshTokenIdStore.validate(user.id , refreshTokenId)
            //console.log(IsValid)
            
            if (IsValid) {
                
                await this.refreshTokenIdStore.invalidate(user.id)
                
                return await this.GeneRateToken(user)
            } 
            else {
                throw new Error('Error , RefreshToken is Invalid')
            }
            //console.log(RefreshTokendto.refreshtoken)
            

        } catch (error) {
            console.log(error)
           // throw error
           if (error instanceof InvalidRefreshTokenErr) {
            //console.log(error)
            throw new UnauthorizedException('AD RefreshToken is Invalid')
           }
            //throw new UnauthorizedException('xw')
        }
        
        //throw new UnauthorizedException()
        
    }

    private async SIgnToken<T>(UserId: number , ExpireIn : number , payload ?: T) {
        return await this.Jwtservice.signAsync(
            {
                sub: UserId,
                ...payload
            },// as ActiveUserData,
            {
                audience: this.Jwtconfig.audience,
                issuer: this.Jwtconfig.issuer,
                secret: this.Jwtconfig.secret,
                expiresIn: ExpireIn
            }
        );
    }
}