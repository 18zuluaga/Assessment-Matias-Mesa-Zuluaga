import { IsEnum, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus, Specialty } from 'src/common/enum';

export class PatientUpdateAppointmentDto {
  @ApiProperty({
    description: 'The status of the appointment',
    enum: AppointmentStatus,
    example: AppointmentStatus.PENDING,
  })
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;
}
