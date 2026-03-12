const stateColor = {
  normal: '#1bd96a',
  warning: '#ffd24d',
  fault: '#ff5d5d'
};

export function renderDashboard(root, state) {
  root.innerHTML = `
    <main class="dashboard">
      <header class="glass hero">
        <h1>QMS Enterprise 4.0</h1>
        <p>Immersive Industrial Operating System</p>
        <div class="tags">
          <span>${state.user.role}</span>
          <span>${state.user.plant}</span>
          <span>${state.performanceMode}</span>
          <span>${state.connectionStatus}</span>
        </div>
      </header>

      <section class="kpi-grid">
        ${Object.entries(state.kpis)
          .map(([key, value]) => `<article class="kpi glass"><h2>${key}</h2><strong>${value}</strong></article>`)
          .join('')}
      </section>

      <section class="glass panel">
        <h2>Digital Twin Machines</h2>
        <div class="machines">
          ${state.machines
            .map(
              (machine) => `<article class="machine-card" style="--state:${stateColor[machine.status] || '#66d8ff'}">
                <h3>${machine.id}</h3>
                <p>${machine.line}</p>
                <div class="machine-metrics">
                  <span>Status: ${machine.status}</span>
                  <span>OEE: ${machine.oee}</span>
                  <span>Temp: ${machine.temperature}°C</span>
                  <span>Vib: ${machine.vibration}</span>
                </div>
              </article>`
            )
            .join('')}
        </div>
      </section>
    </main>
  `;
}
