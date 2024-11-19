import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDocDeleteUser,
  ApiDocGetOneUser,
  ApiDocGetUser,
  ApiDocPatchUser,
  ApiDocPostUser,
} from './docs/users.swager.decorators';
import { User } from './entities/user.entity';
import {
  Permissions,
  PrivateService,
  Role,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { Admin } from 'src/common/const';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PrivateService()
  @Permissions('can_create')
  @toTheEntity('users')
  @Role([Admin])
  @Post()
  @ApiDocPostUser(User)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('users')
  @Role([Admin])
  @Get()
  @ApiDocGetUser(User)
  findAll() {
    return this.usersService.findAll();
  }

  @PrivateService()
  @Get(':id')
  @ApiDocGetOneUser(User)
  findOne(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    return this.usersService.findOne(+id, user);
  }

  @PrivateService()
  @ApiDocPatchUser(User)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const user = req.user as UserJWT;
    return this.usersService.update(+id, updateUserDto, user);
  }

  @PrivateService()
  @Delete(':id')
  @ApiDocDeleteUser(User)
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    return this.usersService.remove(+id, user);
  }
}
