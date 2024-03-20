import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { Response } from 'express';
import { access } from 'fs/promises';
import { Auth } from './decorators/auth.decorators';
import { AuthType } from './enums/auth-type-enum';
import { RefreshTokenDto } from './dto/refresh.token.dto';


@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly AUthenService : AuthenticationService){
        
       
    }

    @HttpCode(HttpStatus.OK)
    @Post('Sign-in')
    async Signin(@Res({passthrough : true }) res : Response ,  @Body() SigninDto :  SignInDto ){
        //console.log("d3ed3fe3f")
        const LoginToken = await this.AUthenService.signIn(SigninDto);

        return LoginToken

        res.cookie('LoginToken' , LoginToken , {
            secure :true ,
            httpOnly : true,
            sameSite : true
        })

    }


    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    async RefreshToken(  @Body() RefreshTokendto :  RefreshTokenDto ){
        return this.AUthenService.RefreshTokens(RefreshTokendto)
        
    }

    
    @Post('Sign-up')
    async Signup(@Body() SignupDto :  SignUpDto){
        console.log(SignupDto.name)
        return this.AUthenService.signUp(SignupDto)
    }
}
