export class ViewersUpdatedEvent {
  constructor(
    public readonly supplementId: string,
    public readonly liveViewers: number,
  ) {}
}
