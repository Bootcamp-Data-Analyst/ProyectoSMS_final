import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Upload() {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Validar extensión
    const allowedExtensions = /(\.csv|\.xls|\.xlsx)$/i;
    if (!allowedExtensions.exec(selectedFile.name)) {
      setMessage("Solo se permiten archivos CSV, XLS o XLSX");
      setFile(null);
      return;
    }

    setMessage("");
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Selecciona un archivo primero");
      return;
    }

    try {
      setLoading(true);

      // Para pruebas frontend sin backend, puedes comentar axios y simular success:
      /*
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", user?.email);

      await axios.post("http://localhost:8000/upload", formData, { // Cambia esta URL por la de tu backend
        headers: { "Content-Type": "multipart/form-data" },
      });
      */

      // Simular éxito frontend
      setTimeout(() => { 
        setMessage(`Archivo "${file.name}" subido correctamente`);
        setFile(null);
        setLoading(false);
      }, 0);
    } catch (err) {
      setMessage("Error al subir el archivo");
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Debes estar autenticado para subir archivos</p>;
  }

  return (
    <div>
      <h2>Subida de Archivos</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={loading || !file}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </form>

      {message && (
        <p style={{ color: message.includes("correcto") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Upload;

// Comprobacion de archivos? Si Cuales? CSV/Excel
// Que ve un usuario? Solo subida de archivos
