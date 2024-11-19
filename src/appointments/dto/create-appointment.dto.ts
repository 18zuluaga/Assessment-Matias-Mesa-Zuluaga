import { IsEnum, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus, Specialty } from 'src/common/enum';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The ID of the doctor associated with the appointment',
    example: 2,
  })
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    description: 'The ID of the patient associated with the appointment',
    example: 3,
  })
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    description: 'The start time of the appointment',
    example: '2022-01-01T12:00:00.000Z',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @ApiProperty({
    description: 'The status of the appointment',
    enum: AppointmentStatus,
    example: AppointmentStatus.PENDING,
  })
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;

  @ApiProperty({
    description: 'The specialty of the appointment',
    enum: Specialty,
    example: Specialty.CARDIOLOGY,
  })
  @IsEnum(Specialty)
  @IsNotEmpty()
  specialty: Specialty;
}
