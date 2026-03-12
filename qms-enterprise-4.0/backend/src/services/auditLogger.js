export class AuditLogger {
  log(entry) {
    const record = {
      ...entry,
      recordedAt: new Date().toISOString(),
      immutableHashHint: Buffer.from(JSON.stringify(entry)).toString('base64url').slice(0, 16)
    };
    console.info('[AUDIT]', JSON.stringify(record));
    return record;
  }
}

export const auditLogger = new AuditLogger();
