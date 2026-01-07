import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  SUPPLEMENT_VIEWED_EVENT,
  SUPPLEMENT_LEFT_EVENT,
  SOCKET_DISCONNECTED_EVENT,
  VIEWERS_UPDATED_EVENT,
} from '../supplement/domain/types/supplement-events.types';
import { SupplementViewedEvent } from '../supplement/domain/events/supplement-viewed.event';
import { SupplementLeftEvent } from '../supplement/domain/events/supplement-left.event';
import { SocketDisconnectedEvent } from '../supplement/domain/events/socket-disconnected.event';
import { ViewersUpdatedEvent } from './domain/events/viewers-updated.event';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SupplementGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @SubscribeMessage('viewSupplement')
  handleView(@MessageBody() data: { id: string }, @ConnectedSocket() client: Socket) {
    this.eventEmitter.emit(SUPPLEMENT_VIEWED_EVENT, new SupplementViewedEvent(data.id, client.id));
  }

  @SubscribeMessage('leaveSupplement')
  handleLeave(@MessageBody() data: { id: string }, @ConnectedSocket() client: Socket) {
    this.eventEmitter.emit(SUPPLEMENT_LEFT_EVENT, new SupplementLeftEvent(data.id, client.id));
  }

  handleDisconnect(client: Socket) {
    this.eventEmitter.emit(SOCKET_DISCONNECTED_EVENT, new SocketDisconnectedEvent(client.id));
  }

  @OnEvent(VIEWERS_UPDATED_EVENT)
  handleViewersUpdated(event: ViewersUpdatedEvent) {
    this.server.emit('viewersUpdate', {
      supplementId: event.supplementId,
      liveViewers: event.liveViewers,
    });
  }
}
