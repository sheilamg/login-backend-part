import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './config/typeORM';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { ValidationJWT } from './common/middleware/ValidationJWT.middleware';



@Module({
  imports: [TypeOrmModule.forRoot(typeORM()), UsersModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}