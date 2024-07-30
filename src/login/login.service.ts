import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto} from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, verifyPassword } from 'src/common/utils/hashPassword.utils';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class LoginService {
  constructor(
  private readonly usersService: UsersService,
  private readonly jwtService: JwtService,
  ){}

  async createJWT(loginDto : CreateLoginDto) {
      const {email,password} = loginDto

      //where should be this?  
      const user = await this.usersService.findOneByEmail(email.toLowerCase())
      
      if(!user){
        throw new HttpException('This Email doesnt exits', HttpStatus.CONFLICT)
      }

      if(user.password === undefined){
        throw new HttpException('it seems like this is undefined jiji', HttpStatus.CONFLICT)
      }

      
      const verificarPass = await verifyPassword(password, user.password)

      if(!verificarPass){
        throw new HttpException('Incorrect password, try again', HttpStatus.CONFLICT)
        //throw new UnauthorizedException()
      }
     
        ///
        const payload = { user: { email: email, password: password} }
        const token = await this.jwtService.signAsync(payload)

        return{
          token: token,
          email: user.email  
        }
      }
      
      
    



  async register({password, email, name}: CreateRegisterDto){
    const user = await this.usersService.findOneByEmail(email)

    if(user){
      throw new BadRequestException("Email already exists")  
    }

    const securePass = await hashPassword(password);

    const createUser: CreateRegisterDto = await this.usersService.create({name, email, password: securePass })

    return {
      message: "User created successfully"
    }
  }
  
}
