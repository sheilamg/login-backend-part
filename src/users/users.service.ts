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
    @InjectRepository(User)
    private readonly logger: Logger,
  ) {}

  findAll() {
    return this.userRepository.find({withDeleted: true});
  }
  async create(createUserDto: CreateUserDto) {
    const checkEmailExistence = await this.userRepository.findOne({ where: { email: createUserDto.email.toLowerCase() }})
    if(checkEmailExistence){
      throw new HttpException('The user already exists', HttpStatus.CONFLICT)
    }
    try {
      return await this.userRepository.save({ ...createUserDto, password: hashPassword(createUserDto.password) });
    } catch (error) {
        this.logger.error(error.message, error.stack)
        throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id: id }, updateUserDto);
  }

  async remove(idUser: string) {
    const aEliminar = await this.userRepository.findOne({where: {id: idUser}})
    return this.userRepository.softRemove(aEliminar)
  }
}
