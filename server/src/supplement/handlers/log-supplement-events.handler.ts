import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  SUPPLEMENT_VIEWED_EVENT,
  SUPPLEMENT_LEFT_EVENT,
  SOCKET_DISCONNECTED_EVENT,
} from '../constants/supplement-events.constants';
import { SupplementViewedEvent } from '../events/domain/supplement-viewed.event';
import { SupplementLeftEvent } from '../events/domain/supplement-left.event';
import { SocketDisconnectedEvent } from '../events/domain/socket-disconnected.event';

@Injectable()
export class LogSupplementEventsHandler {
  private readonly logger = new Logger(LogSupplementEventsHandler.name);

  @OnEvent(SUPPLEMENT_VIEWED_EVENT)
  onViewed(event: SupplementViewedEvent) {
    this.logger.log(`User '${event.socketId}' started viewing '${event.supplementId}'`);
  }

  @OnEvent(SUPPLEMENT_LEFT_EVENT)
  onLeft(event: SupplementLeftEvent) {
    this.logger.log(`User '${event.socketId}' stopped viewing '${event.supplementId}'`);
  }

  @OnEvent(SOCKET_DISCONNECTED_EVENT)
  onDisconnected(event: SocketDisconnectedEvent) {
    this.logger.log(`Socket '${event.socketId}' disconnected`);
  }
}
