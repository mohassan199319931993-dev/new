const listeners = new Set();

export const mockMachines = [
  { id: 'MIX-101', line: 'Mixing', status: 'normal', oee: 94.2, temperature: 52, vibration: 1.2 },
  { id: 'FILL-204', line: 'Filling', status: 'warning', oee: 88.6, temperature: 68, vibration: 2.6 },
  { id: 'PACK-310', line: 'Packaging', status: 'fault', oee: 63.5, temperature: 81, vibration: 5.1 }
];

export const mockAlerts = [
  { id: 'SPC-ALERT-1001', chart: 'Xbar', machineId: 'FILL-204', message: 'Point above UCL for viscosity' }
];

export function createStore() {
  const state = {
    user: { role: 'enterprise-admin', plant: 'plant-1' },
    kpis: { oee: 92.4, fpY: 98.1, capaOpen: 1, machineFaults: 1 },
    performanceMode: detectMode(),
    connectionStatus: 'demo-mode',
    machines: [...mockMachines],
    alerts: [...mockAlerts]
  };

  return {
    getState: () => state,
    set(partial) {
      Object.assign(state, partial);
      listeners.forEach((fn) => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

function detectMode() {
  const memory = navigator.deviceMemory || 8;
  if (memory >= 8) return 'Full 3D Mode';
  if (memory >= 4) return 'Optimized 3D Lite';
  return '2D Fallback Mode';
}
