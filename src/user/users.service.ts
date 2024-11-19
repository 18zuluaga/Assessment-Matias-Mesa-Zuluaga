import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { Admin } from 'src/common/const';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOne({where: {id:createUserDto.role_id}});
    delete createUserDto.role_id;
    const user = await this.userRepository.save({createUserDto, role});
    delete user.password;
    return user;
  }
  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email} });
  }

  async findOne(id: number, user: UserJWT) {
    if (user.id === id || user.role.name === Admin) {
      return this.userRepository.findOne({ where: { id } });
    }
    throw new UnauthorizedException('You are not authorized to access this user');
  }

  async findByRol(id: number){
    const role = await this.roleRepository.findOne({where: {id}});
    return this.userRepository.find({where: {role}});
  }

  async findOneInternal(id:number){
    return this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto, user: UserJWT) {
    if (user.id === id || user.role.name === Admin) {
      return this.userRepository.update(id, updateUserDto);
    }
    throw new UnauthorizedException('You are not authorized to update this user');
  }

  async remove(id: number, user: UserJWT) {
    if (user.id === id || user.role.name === Admin) {
      return this.userRepository.delete(id);
    }
    throw new UnauthorizedException('You are not authorized to delete this user');
  }
}
