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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiDocDeleteAppointment, ApiDocGetAppointments, ApiDocPatchAppointment, ApiDocPatchAppointmentStatus, ApiDocPostAppointments } from './docs/appointments.swager.decorators';
import { ApiTags } from '@nestjs/swagger';
import {
  Permissions,
  PrivateService,
  Role,
  toTheEntity,
} from 'src/common/decorators/permissions.decorator';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { PatientUpdateAppointmentDto } from './dto/patient-update-appointment.dto';
import { Admin } from 'src/common/const';
import { Appointment } from './entities/appointment.entity';
import { Specialty } from 'src/common/enum';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @PrivateService()
  @ApiDocPostAppointments(CreateAppointmentDto)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    const user = req.user as UserJWT;
    return this.appointmentsService.create(createAppointmentDto, user);
  }

  @PrivateService()
  @Permissions('can_read')
  @Role([Admin, 'doctor'])
  @toTheEntity('appointments')
  @ApiDocGetAppointments(AppointmentsService)
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('DoctorAvailability')
  getDoctorAvailability() {
    return this.appointmentsService.doctorAvailability();
  }
  
  @PrivateService()
  @Get('findMyAppointment')
  findMyAppointment(@Request() req) {
    const user = req.user as UserJWT;
    return this.appointmentsService.findByPatient(user.id);
  }
  
  @PrivateService()
  @Get('findByPatient:id')
  findByPatient(@Param('id') id: string) {
    return this.appointmentsService.findByPatient(+id);
  }

  @PrivateService()
  @Permissions('can_read')
  @toTheEntity('appointments')
  @Role([Admin, 'doctor'])
  @Get('findByDoctor:id')
  findByDoctor(@Param('id') id: string) {
    return this.appointmentsService.findByDoctor(+id);
  }
  
  @PrivateService()
  @Permissions('can_read')
  @Role([Admin, 'doctor'])
  @toTheEntity('appointments')
  @Get('findByStartTime:StartTime')
  findByStartTime(@Param('StartTime') StartTime: string) {
    const date = new Date(StartTime);
    return this.appointmentsService.findByStartTime(date);
  }

  @PrivateService()
  @Permissions('can_read')
  @Role([Admin, 'doctor'])
  @toTheEntity('appointments')
  @Get('findBySpecialty:specialty')
  findBySpecialty(@Param('specialty') specialty: Specialty) {
    return this.appointmentsService.findBySpacialty(specialty);
  }
  
  @PrivateService()
  @Permissions('can_read')
  @Role([Admin, 'doctor'])
  @toTheEntity('appointments')
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    return this.appointmentsService.findOne(+id, user);
  }
  
  @PrivateService()
  @Patch('ChangesStatus:id')
  @ApiDocPatchAppointmentStatus(PatientUpdateAppointmentDto)
  updateStatus(
    @Param('id') id: string,
    @Body() PatientUpdateAppointmentDto: PatientUpdateAppointmentDto,
    @Request() req,
  ) {
    const user = req.user as UserJWT;
    return this.appointmentsService.update(+id, PatientUpdateAppointmentDto, user);
  }

  @PrivateService()
  @Permissions('can_update')
  @Role([Admin, 'doctor'])
  @toTheEntity('appointments')
  @ApiDocPatchAppointment(CreateAppointmentDto)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Request() req,
  ) {
    const user = req.user as UserJWT;
    return this.appointmentsService.update(+id, updateAppointmentDto, user);
  }
  
  
  @ApiDocDeleteAppointment(Appointment)
  @PrivateService()
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user as UserJWT;
    return this.appointmentsService.remove(+id, user);
  }
}
