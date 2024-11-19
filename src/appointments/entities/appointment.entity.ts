import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus, Specialty } from "src/common/enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
  
  @PrimaryGeneratedColumn()
  id: number;

  
  @ManyToOne(() => User, (user) => user.doctor, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  
  @ManyToOne(() => User, (user) => user.patients, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
  })
  status: AppointmentStatus;

  @Column({
    type: 'enum',
    enum: Specialty,
  })
  specialty: Specialty;

  @Column({ nullable: true })
  comments: string;
}
