import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../users/dto/create-user.dto").CreateUserDto & import("../users/entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        rol: string;
        message: string;
        user: {
            name: string;
            email: string;
        };
    }>;
    refreshToken(body: {
        token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        email: any;
        rol: any;
        status: number;
        user: any;
        message: string;
    }>;
    verify(req: any): {
        user: any;
        access_token: any;
        rol: any;
    };
    profile(req: any): any;
}
