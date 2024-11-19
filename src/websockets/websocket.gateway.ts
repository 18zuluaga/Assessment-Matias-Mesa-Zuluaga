import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppointmentsService } from 'src/appointments/appointments.service';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly myService: AppointmentsService) {}

  @WebSocketServer()
  server: Server;

  private static intervalId: NodeJS.Timeout | null = null;

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);

    if (
      this.server.engine.clientsCount === 1 &&
      WebsocketGateway.intervalId === null
    ) {
      WebsocketGateway.intervalId = setInterval(() => {
        this.emitConstantData();
      }, 3000);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);

    if (
      this.server.engine.clientsCount === 0 &&
      WebsocketGateway.intervalId !== null
    ) {
      clearInterval(WebsocketGateway.intervalId);
      WebsocketGateway.intervalId = null;
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any) {
    const users = await this.myService.findAll();
    this.server.emit('messageServers', users);
  }

  private async emitConstantData() {
    const users = await this.myService.doctorAvailability();
    this.server.emit('messageServers', users);
  }
}
