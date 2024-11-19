import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocLogin } from './docs/auth.swagger.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiDocLogin()
  async signIn(@Body() signInDto: LoginDto) {
    return this.authService.login({
      email: signInDto.email,
      password: signInDto.password,
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }
}
