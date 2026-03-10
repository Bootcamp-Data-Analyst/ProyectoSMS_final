const LOGS_KEY = "app_logs";

// Guardar log
export function addLog(entry) {
  const logs = JSON.parse(localStorage.getItem(LOGS_KEY)) || [];
  logs.push({
    ...entry,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

// Obtener todos los logs
export function getLogs() {
  return JSON.parse(localStorage.getItem(LOGS_KEY)) || [];
}

// Limpiar logs (opcional)
export function clearLogs() {
  localStorage.removeItem(LOGS_KEY);
}