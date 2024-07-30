import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/utils/hashPassword.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find({withDeleted: true});
  }
  async create(createUserDto: CreateUserDto) {
    const checkEmailExistence = await this.userRepository.findOne({ where: { email: createUserDto.email.toLowerCase() }})
    if(checkEmailExistence){
      throw new HttpException('The user already exists', HttpStatus.CONFLICT)
    }
 
      const securePass = await hashPassword(createUserDto.password);

      const createUser: CreateUserDto = this.userRepository.create({...createUserDto, password: securePass })
      return await this.userRepository.save(createUser);

  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findOneByEmail(email: string){
    return await this.userRepository.findOneBy({email})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id: id }, updateUserDto);
  }

  async remove(idUser: string) {
    const aEliminar = await this.userRepository.findOne({where: {id: idUser}})
    return this.userRepository.softRemove(aEliminar)
  }
}
