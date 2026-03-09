import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  // Función para manejar el cambio de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validar el tipo de archivo
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Solo se permiten archivos CSV o Excel (.xls, .xlsx)");
      e.target.value = null; // Limpiar el input
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    console.log("Archivo a subir:", file);
  };

  return (
    <div>
      <h2>Subir archivo</h2>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>Subir</button>
    </div>
  );
}

export default Upload;

// Comprobacion de archivos? Si Cuales? CSV/Excel
// Que ve un usuario? Solo subida de archivos