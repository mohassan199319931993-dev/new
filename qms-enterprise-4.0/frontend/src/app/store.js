const listeners = new Set();

export function createStore() {
  const state = {
    user: { role: 'enterprise-admin', plant: 'plant-1' },
    kpis: { oee: 92.4, fpY: 98.1, capaOpen: 1, machineFaults: 1 },
    performanceMode: detectMode(),
    machines: [],
    alerts: []
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
