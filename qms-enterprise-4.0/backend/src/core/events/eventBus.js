import { EventEmitter } from 'node:events';

class PlatformEventBus extends EventEmitter {
  emitDomainEvent(eventName, payload) {
    this.emit(eventName, {
      timestamp: new Date().toISOString(),
      eventName,
      payload
    });
  }
}

export const eventBus = new PlatformEventBus();
