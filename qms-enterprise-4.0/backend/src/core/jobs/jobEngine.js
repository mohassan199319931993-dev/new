export class JobEngine {
  constructor() {
    this.jobs = new Map();
  }

  register(name, handler, intervalMs) {
    this.jobs.set(name, { handler, intervalMs, timer: null });
  }

  startAll() {
    for (const [name, job] of this.jobs.entries()) {
      job.timer = setInterval(async () => {
        await job.handler();
      }, job.intervalMs);
      console.info(`[JobEngine] started ${name} every ${job.intervalMs}ms`);
    }
  }
}
