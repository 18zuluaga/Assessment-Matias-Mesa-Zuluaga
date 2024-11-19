import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Role } from "src/entities/role.entity";
import { AppointmentsModule } from "src/appointments/appointments.module";
import { AppointmentsService } from "src/appointments/appointments.service";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { UsersModule } from "src/user/users.module";
import { UsersService } from "src/user/users.service";


@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Appointment]),AppointmentsModule, UsersModule],
  providers: [WebsocketGateway, AppointmentsService, UsersService],
})
export class GatewayModule {}