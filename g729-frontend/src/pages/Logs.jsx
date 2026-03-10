import { useState, useEffect } from "react";
import { getLogs } from "../services/logService";

function Logs() {

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterAction, setFilterAction] = useState("");

  // Paginación simple
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    const allLogs = getLogs().reverse(); // Mostrar primero los más recientes
    setLogs(allLogs);
    setFilteredLogs(allLogs);
  }, []);

  // Filtrar logs
  useEffect(() => {
    let tempLogs = logs;

    if (filterUser) {
      tempLogs = tempLogs.filter(log =>
        log.user.toLowerCase().includes(filterUser.toLowerCase())
      );
    }

    if (filterAction) {
      tempLogs = tempLogs.filter(log =>
        log.action.toLowerCase().includes(filterAction.toLowerCase())
      );
    }

    setFilteredLogs(tempLogs);
    setCurrentPage(1);
  }, [filterUser, filterAction, logs]);

  // Paginación
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  return (
    <div>
      <h2>Logs de actividad</h2>

      {/* Filtros */}
      <div style={{marginBottom: "10px"}}>
        <input
          type="text"
          placeholder="Filtrar por usuario"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          style={{marginRight: "10px"}}
        />
        <input
          type="text"
          placeholder="Filtrar por acción"
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
        />
      </div>

      {/* Tabla de logs */}
      <table border="1" cellPadding="5" cellSpacing="0" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>Fecha / Hora</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Archivo</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length === 0 && (
            <tr>
              <td colSpan="5" style={{textAlign:"center"}}>No hay registros</td>
            </tr>
          )}
          {currentLogs.map((log, i) => (
            <tr key={i}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.file || "-"}</td>
              <td>{log.ip || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{marginTop:"10px"}}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{margin: "0 10px"}}>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))}
          disabled={currentPage === totalPages || totalPages===0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Logs;