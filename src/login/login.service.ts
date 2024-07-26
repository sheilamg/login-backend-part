import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService,
  ){}

  async createJWT(email: string, password: string) {

    //const data = this.userRepository.findOne({where{ loginDto.id : id}});
    
    try {
      //where should be this?  
      const user = await this.userRepository.findOne({where: {email} })
      const isPasswordValid = (password == user.password)

      if(!isPasswordValid){
        throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)
      }
      if(user && isPasswordValid){
        ///
        const payload = { user: { email: email, password: password} }
        const token = this.jwtService.sign(payload, {expiresIn: 20})

        return{
          token: token,  
        }
      }
      
      
    } catch (error) {
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)

    }

    

    
  }

  async verifyToken(token: string){
    try {
      await this.jwtService.verify(token)
      const decoded = await this.jwtService.decode(token)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  
}
