import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

type Tokens = {
    access_token: string,
    refresh_token: string,
}



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
    ){}

    async register({name,email,password}: RegisterDto){
        const user =  await this.userService.findByOneEmail(email)

        if(user){
            throw new BadRequestException('Usuario ya existe')
        }

        return await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 15)
        })
    }
    
    async login({email, password}: LoginDto){
        const user =  await this.userService.findByOneEmail(email)
        if(!user){
            throw new UnauthorizedException("Usuario no encontrado")
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = { email: user.email };
        const rol = user.rol;
        // const token = await this.jwtService.signAsync(payload);
        // const refreshToken = await this.jwtService.signAsync(payload, this.refreshTokenConfig)
        const {access_token, refresh_token} = await this.generateTokens(payload)


        return {access_token, refresh_token, email, rol, message: 'Login Successful'};
    }
    
    async refreshToken(refreshToken: string){
        try {
            const user = this.jwtService.verify(refreshToken, {secret: this.refreshTokenConfig.secret})
            const payload = {email: user.email}
            const {access_token, refresh_token} = await this.generateTokens(payload)

            return {
                access_token,
                refresh_token,
                email: user.email,
                rol: user.rol,
                status: 200,
                message: 'Refresh token correctamente'
            }

        } catch (error) {
            throw new UnauthorizedException('Refresh token inválido');
        }
    }
    

    private async generateTokens(user): Promise<Tokens>{
        const jwtPayload = {email: user.email}

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload),
            this.jwtService.signAsync(jwtPayload, this.refreshTokenConfig)
        ])
        return {
            access_token: accessToken,
            refresh_token:refreshToken
        }
    }

   
}
