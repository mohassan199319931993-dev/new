function pageShell(title, subtitle, content) {
  return `
    <main class="dashboard">
      <header class="glass hero">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </header>
      <section class="glass panel">${content}</section>
    </main>
  `;
}

export function renderQualityPage(root, state) {
  root.innerHTML = pageShell(
    'Quality Management',
    'NCR, CAPA, 8D, deviations and traceability overview',
    `<h2>Open CAPA: ${state.alerts.length || 1}</h2>
     <p>Use this page to manage non-conformance lifecycle and corrective/preventive actions across plants.</p>`
  );
}

export function renderSpcPage(root, state) {
  const items = state.alerts.slice(0, 10).map((a) => `<li><strong>${a.chart}</strong> - ${a.machineId}: ${a.message}</li>`).join('');
  root.innerHTML = pageShell(
    'SPC Center',
    'Xbar / R / S / P / NP / C / U charts',
    `<ul class="alerts">${items || '<li>No active SPC alerts.</li>'}</ul>`
  );
}

export function renderIotPage(root, state) {
  const cards = state.machines.map((m) => `<article class="machine-card" style="--state:${m.status === 'fault' ? '#ff5d5d' : m.status === 'warning' ? '#ffd24d' : '#1bd96a'}"><h3>${m.id}</h3><p>${m.line}</p><div class="machine-metrics"><span>Status: ${m.status}</span><span>Temp: ${m.temperature}°C</span><span>Vibration: ${m.vibration}</span></div></article>`).join('');
  root.innerHTML = pageShell('IoT Integration', 'Machine telemetry and ingestion status', `<div class="machines">${cards || '<p>No telemetry available.</p>'}</div>`);
}

export function renderAiPage(root) {
  root.innerHTML = pageShell('AI Intelligence', 'Root cause suggestion, CAPA drafting, and quality predictions', '<p>AI services are wired as module boundaries and ready for model-provider adapters.</p>');
}

export function renderBuilderPage(root) {
  root.innerHTML = pageShell('No-Code Builder', 'Tables, forms, workflows, and dynamic views', '<p>Builder runtime is prepared for entity designer, drag-drop forms, and workflow engine extensions.</p>');
}

export function renderReportsPage(root) {
  root.innerHTML = pageShell('Enterprise Reporting', 'KPI, COPQ, and scheduled exports', '<p>Reporting module supports extensible export adapters (PDF / Excel / CSV) and schedule orchestration hooks.</p>');
}

export function renderAdminPage(root, state) {
  root.innerHTML = pageShell('Admin & Security', 'RBAC, ABAC, audit, and tenant operations', `<p>Current role: <strong>${state.user.role}</strong>, Plant scope: <strong>${state.user.plant}</strong>.</p>`);
}
