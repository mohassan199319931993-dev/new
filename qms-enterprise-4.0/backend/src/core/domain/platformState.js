const machineCatalog = [
  { id: 'MIX-101', line: 'Mixing', status: 'normal', oee: 94.2, temperature: 52, vibration: 1.2 },
  { id: 'FILL-204', line: 'Filling', status: 'warning', oee: 88.6, temperature: 68, vibration: 2.6 },
  { id: 'PACK-310', line: 'Packaging', status: 'fault', oee: 63.5, temperature: 81, vibration: 5.1 }
];

const capaQueue = [
  {
    id: 'CAPA-2026-001',
    machineId: 'PACK-310',
    severity: 'high',
    title: 'Excessive vibration causes seal inconsistency',
    owner: 'quality-manager',
    status: 'open'
  }
];

const spcAlerts = [
  {
    id: 'SPC-ALERT-1001',
    chart: 'Xbar',
    machineId: 'FILL-204',
    message: 'Point above UCL for viscosity',
    level: 'warning',
    ts: new Date().toISOString()
  }
];

export const platformState = {
  listMachines() {
    return machineCatalog;
  },
  updateMachineState(machineId, patch) {
    const machine = machineCatalog.find((m) => m.id === machineId);
    if (!machine) return null;
    Object.assign(machine, patch, { updatedAt: new Date().toISOString() });
    return machine;
  },
  listCapa() {
    return capaQueue;
  },
  createCapa(payload) {
    const record = {
      id: `CAPA-${new Date().getFullYear()}-${String(capaQueue.length + 1).padStart(3, '0')}`,
      status: 'open',
      ...payload
    };
    capaQueue.unshift(record);
    return record;
  },
  listSpcAlerts() {
    return spcAlerts;
  },
  pushSpcAlert(payload) {
    const alert = {
      id: `SPC-ALERT-${1000 + spcAlerts.length + 1}`,
      ts: new Date().toISOString(),
      ...payload
    };
    spcAlerts.unshift(alert);
    return alert;
  }
};
