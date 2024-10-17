import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constanst/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    
    if(!token){
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, 
        {
          secret: process.env.JWT_SECRET
        }
      );

      request['user'] = payload;
    } catch (error) {
      console.log(error, "error")
      throw new UnauthorizedException();
    }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined
  }
}


//canActivate es un metodo que se ejcuta antes de una peticion 
//si el token es valido, si es valid deja pasar a una ruta