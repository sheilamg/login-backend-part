import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,
JwtModule.register({
  global: true,
  secret: 'somethinsomething',
  signOptions: { expiresIn: '1d'},
})],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
