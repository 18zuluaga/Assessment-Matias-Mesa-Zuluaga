import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import {
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { UsersService } from 'src/user/users.service';
import { addHour } from '@formkit/tempo';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { AppointmentStatus, Specialty } from 'src/common/enum';
import { Admin } from 'src/common/const';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly usersService: UsersService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, user: UserJWT) {
    console.log(new Date());
    if (user.id === createAppointmentDto.patient_id || user.role.name === Admin) {
      createAppointmentDto.start_time = new Date(createAppointmentDto.start_time);
      const end_time = addHour(createAppointmentDto.start_time, 1);
  
      const doctor = await this.usersService.findOneInternal(
        createAppointmentDto.doctor_id,
      );
      const patient = await this.usersService.findOneInternal(
        createAppointmentDto.patient_id,
      );
  
      if (!doctor || !patient ) {
        throw new Error('Doctor or patient not found');
      }
  
      const overlappingAppointment = await this.appointmentRepository.findOne({
        where: [
          {
            doctor,
            start_time: Between(createAppointmentDto.start_time, end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThan(createAppointmentDto.start_time),
            end_time: MoreThan(createAppointmentDto.start_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThan(end_time),
            end_time: MoreThan(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThanOrEqual(createAppointmentDto.start_time),
            end_time: MoreThanOrEqual(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            patient,
            start_time: Between(createAppointmentDto.start_time, end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            patient,
            start_time: LessThan(createAppointmentDto.start_time),
            end_time: MoreThan(createAppointmentDto.start_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            patient,
            start_time: LessThan(end_time),
            end_time: MoreThan(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            patient,
            start_time: LessThanOrEqual(createAppointmentDto.start_time),
            end_time: MoreThanOrEqual(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
        ],
      });
  
      if (overlappingAppointment) {
        throw new Error('Appointment already exists in the given time slot');
      }
      delete createAppointmentDto.patient_id;
      delete createAppointmentDto.doctor_id;
      return await this.appointmentRepository.save({...createAppointmentDto, doctor, patient, end_time});
    }
    throw new UnauthorizedException('You are not authorized to create Appointment');
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

  async findByPatient(id: number) {
    const patient = await this.usersService.findOneInternal(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    const appointment = await this.appointmentRepository.find({where: {patient}})
    return appointment;
  }

  async findByDoctor(id: number) {
    const doctor = await this.usersService.findOneInternal(id);
    if (!doctor) {
      throw new Error('doctor not found');
    }
    const appointment = await this.appointmentRepository.find({where: {doctor}})
    return appointment;
  }

  async findByStartTime(start_time: Date){
    return await this.appointmentRepository.find({where: {start_time}});
  }

  async findBySpacialty(specialty: Specialty){
    return await this.appointmentRepository.find({where: {specialty}});
  }

  async doctorAvailability(){
    const date = new Date();
    const end_time = addHour(date,1)
    const doctor = await this.usersService.findByRol(2);
    const doctorAvailability = await Promise.all(doctor.map(async (doctor) => {
      const overlappingAppointment = await this.appointmentRepository.findOne({
        where: [
          {
            doctor,
            start_time: Between(date, end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThan(date),
            end_time: MoreThan(date),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThan(end_time),
            end_time: MoreThan(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
          {
            doctor,
            start_time: LessThanOrEqual(date),
            end_time: MoreThanOrEqual(end_time),
            status: Not(AppointmentStatus.CANCELLED),
          },
        ],
      });
      
      if (overlappingAppointment) {
        return {doctor, availability: false};
      }
      return {doctor, availability: true};;
    }));
    return doctorAvailability;
  }

  async findOne(id: number, user: UserJWT) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    if (user.role.name === 'doctor' || appointment.patient.id === user.id || user.role.name === Admin) {
      return appointment;
    }
    throw new UnauthorizedException('You are not authorized to view this appointment');
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto , user: UserJWT) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (updateAppointmentDto.status === 'Confirmed' && user.role.name === 'patient') {
      throw new Error('Only doctors and admins can confirm appointments');
    }
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    if (appointment.doctor.id === user.id || appointment.patient.id === user.id || user.role.name === Admin) {
      const updatedAppointment = Object.assign(appointment, updateAppointmentDto);
      return await this.appointmentRepository.save(updatedAppointment);
    }
    throw new UnauthorizedException('You are not authorized to update this appointment');
  }

  async remove(id: number, user: UserJWT) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    if(appointment.doctor.id === user.id || appointment.patient.id === user.id || user.role.name === Admin){
      return await this.appointmentRepository.remove(appointment);
    }
    throw new UnauthorizedException('You are not authorized to delete this appointment');
  }
}
