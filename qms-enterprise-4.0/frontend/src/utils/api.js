const API_BASE = 'http://localhost:8080/api';

export async function issueDemoToken() {
  const response = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ role: 'admin', plantId: 'plant-1' })
  });
  if (!response.ok) throw new Error('token issue failed');
  return response.json();
}

export async function fetchMachines(accessToken) {
  const response = await fetch(`${API_BASE}/quality/plants/plant-1/machines`, {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('machines fetch failed');
  const payload = await response.json();
  return payload.machines || [];
}

export async function fetchAlerts(accessToken) {
  const response = await fetch(`${API_BASE}/spc/plants/plant-1/alerts`, {
    headers: { authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('alerts fetch failed');
  const payload = await response.json();
  return payload.items || [];
}
