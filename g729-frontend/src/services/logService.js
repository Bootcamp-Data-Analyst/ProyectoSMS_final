import api from "./api";

export async function getLogs() {
  try {
    const response = await api.get("/logs");
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Adapt to backend response shape
    return response.data.logs || response.data.data || [];
  } catch (error) {
    console.error("Error fetching logs from backend", error);
    // Fallback temporal o mock para que la UI no rompa
    return [
      { timestamp: Date.now(), user: "system", action: "Error fetching logs", file: "-", ip: "-" },
    ];
  }
}
