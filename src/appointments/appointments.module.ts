import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UsersModule } from 'src/user/users.module';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Role]),UsersModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, UsersService, JwtService],
})
export class AppointmentsModule {}