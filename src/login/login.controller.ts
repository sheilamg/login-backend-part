import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req){
    return req.user
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() loginDto: CreateLoginDto) {
    return this.loginService.createJWT(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: CreateRegisterDto){
    return this.loginService.register(registerDto)
  }

  
}
