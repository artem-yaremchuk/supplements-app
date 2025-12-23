import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupplementGateway {
  private viewers: Record<string, string[]> = {};

  private readonly logger = new Logger(SupplementGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('viewSupplement')
  handleView(@MessageBody() data: { id: string }, @ConnectedSocket() client: Socket) {
    const supplementId = data.id;

    if (!this.viewers[supplementId]) {
      this.viewers[supplementId] = [];
    }

    if (!this.viewers[supplementId].includes(client.id)) {
      this.viewers[supplementId].push(client.id);
    }

    const liveViewers = this.viewers[supplementId].length;

    this.server.emit('viewersUpdate', {
      supplementId,
      liveViewers,
    });

    this.logger.log(
      `User '${client.id}' started viewing '${supplementId}'. Active viewers: ${liveViewers}`,
    );
  }

  @SubscribeMessage('leaveSupplement')
  handleLeave(@MessageBody() data: { id: string }, @ConnectedSocket() client: Socket) {
    const supplementId = data.id;

    if (this.viewers[supplementId]) {
      this.viewers[supplementId] = this.viewers[supplementId].filter(
        (socketId) => socketId !== client.id,
      );
    }

    const liveViewers = this.viewers[supplementId]?.length ?? 0;

    this.server.emit('viewersUpdate', {
      supplementId,
      liveViewers,
    });

    this.logger.log(
      `User '${client.id}' stopped viewing '${supplementId}'. Active viewers: ${liveViewers}`,
    );
  }

  handleDisconnect(client: Socket) {
    for (const supplementId of Object.keys(this.viewers)) {
      this.viewers[supplementId] = this.viewers[supplementId].filter(
        (socketId) => socketId !== client.id,
      );

      const activeViewers = this.viewers[supplementId].length;

      this.server.emit('viewersUpdate', {
        supplementId,
        activeViewers,
      });

      this.logger.log(
        `User '${client.id}' disconnected from '${supplementId}'. Active viewers: ${activeViewers}`,
      );
    }
  }
}
