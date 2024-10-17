import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly AuthService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.AuthService.register(registerDto)
    }
    
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.AuthService.login(loginDto)
    }

    // @Post('refresh')
    // refreshToken(
    //     @Req() request: Request
    // ){
    //     const [type, token] = request.headers['authorization']?.split(' ') || []
    //     return this.AuthService.refreshToken(token)
    // }

    @Post('refresh')
refreshToken(
    @Body() body: { token: string }
) {
    const refreshToken = body.token;
    return this.AuthService.refreshToken(refreshToken);
}

    @Get('verify')
    @UseGuards(AuthGuard)
    verify(@Request() req,){
        return [req.user];
    }



    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req,){
        return req.user;
    }
}
