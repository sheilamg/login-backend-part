import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}

  async canActivate( context: ExecutionContext ): Promise<boolean>{
    const request = context.switchToHttp().getRequest()
    console.log(request.headers.authorization)

    const token = this.extractTokenFromHeader(request)

    if(!token){
      throw new UnauthorizedException('token not found')
    }

    try {
      await this.jwtService.verify(token, {secret: 'somethinsomething',})
      const decoded = await this.jwtService.decode(token)
      //request['user'] = decoded
      request.user = decoded
  
    } catch (error) {
      throw new UnauthorizedException('Invalid token')      
    }

    return true
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
