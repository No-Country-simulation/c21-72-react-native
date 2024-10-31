import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private refreshTokenConfig;
    constructor(userService: UsersService, jwtService: JwtService, refreshTokenConfig: ConfigType<typeof refreshJwtConfig>);
    register({ name, email, password }: RegisterDto): Promise<import("../users/dto/create-user.dto").CreateUserDto & User>;
    login({ email, password }: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        rol: string;
        message: string;
        user: {
            name: string;
            email: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        email: any;
        rol: any;
        status: number;
        user: any;
        message: string;
    }>;
    private generateTokens;
}
