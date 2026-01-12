import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  SUPPLEMENT_VIEWED_EVENT,
  SUPPLEMENT_LEFT_EVENT,
  SOCKET_DISCONNECTED_EVENT,
  VIEWERS_UPDATED_EVENT,
} from '../types/supplement-events.types';
import { SupplementViewedEvent } from '../events/domain/supplement-viewed.event';
import { SupplementLeftEvent } from '../events/domain/supplement-left.event';
import { SocketDisconnectedEvent } from '../events/domain/socket-disconnected.event';
import { ViewersUpdatedEvent } from '../events/integration/viewers-updated.event';

@Injectable()
export class UpdateLiveViewersHandler {
  private viewers: Record<string, string[]> = {};

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(SUPPLEMENT_VIEWED_EVENT)
  handleViewed(event: SupplementViewedEvent) {
    const { supplementId, socketId } = event;

    if (!this.viewers[supplementId]) {
      this.viewers[supplementId] = [];
    }

    if (!this.viewers[supplementId].includes(socketId)) {
      this.viewers[supplementId].push(socketId);
    }

    const liveViewers = this.viewers[supplementId].length;

    this.eventEmitter.emit(
      VIEWERS_UPDATED_EVENT,
      new ViewersUpdatedEvent(supplementId, liveViewers),
    );
  }

  @OnEvent(SUPPLEMENT_LEFT_EVENT)
  handleLeft(event: SupplementLeftEvent) {
    const { supplementId, socketId } = event;

    if (this.viewers[supplementId]) {
      this.viewers[supplementId] = this.viewers[supplementId].filter((id) => id !== socketId);

      if (this.viewers[supplementId].length === 0) {
        delete this.viewers[supplementId];
      }
    }

    const liveViewers = this.viewers[supplementId]?.length ?? 0;

    this.eventEmitter.emit(
      VIEWERS_UPDATED_EVENT,
      new ViewersUpdatedEvent(supplementId, liveViewers),
    );
    console.log(this.viewers);
  }

  @OnEvent(SOCKET_DISCONNECTED_EVENT)
  handleDisconnected(event: SocketDisconnectedEvent) {
    const { socketId } = event;

    for (const supplementId of Object.keys(this.viewers)) {
      const before = this.viewers[supplementId].length;

      this.viewers[supplementId] = this.viewers[supplementId].filter((id) => id !== socketId);

      if (this.viewers[supplementId].length === 0) {
        delete this.viewers[supplementId];
      }

      const liveViewers = this.viewers[supplementId]?.length ?? 0;

      if (liveViewers !== before) {
        this.eventEmitter.emit(
          VIEWERS_UPDATED_EVENT,
          new ViewersUpdatedEvent(supplementId, liveViewers),
        );
      }
    }
  }
}
