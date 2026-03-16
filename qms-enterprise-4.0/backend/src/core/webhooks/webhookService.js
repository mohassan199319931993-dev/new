export class WebhookService {
  async dispatch(eventType, payload) {
    console.info('[WebhookService] dispatch', { eventType, payloadSize: JSON.stringify(payload).length });
    return { ok: true };
  }
}
