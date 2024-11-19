import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string){
      const user: User = await this.usersService.findByEmail(email);
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new NotFoundException(
          'User not found, Verify your credentials or contact your administrator to register'
        );
      }
      delete user.password;
      return user;
  }

  async register(RegisterDto: RegisterDto){
    const user = await this.usersService.findByEmail(RegisterDto.email);
    if (user) {
      throw new NotFoundException('User already exists');
    }
    const password = await bcrypt.hash(RegisterDto.password, 10);
    return this.usersService.create({...RegisterDto, password, role_id : 3});
  }

  async login(user: Partial<User>) {
    try {
      const verifiedUser = await this.validateUser(
        user.email,
        user.password
      );

      const payload = {
        id: verifiedUser.id,
        doc_number: verifiedUser.doc_number,
        role: verifiedUser.role,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
