import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

function Login2FA() {
  const [code, setCode] = useState(""); // Código 2FA ingresado por el usuario
  const [loading, setLoading] = useState(false); // Estado para mostrar un mensaje de carga
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);

  const tempToken = location.state?.temp_token;

  const handleVerify = async (e) => {
    // Verificar el código 2FA

    e.preventDefault();

    setError("");

    if (code.length !== 6) {
      // Validar que el código tenga 6 dígitos
      setError("El código debe tener 6 dígitos");
      return;
    }

    if (!code) {
      setError("Introduce el código 2FA");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/verify-2fa", // Cambia esta URL por la de tu backend
        {
          token: tempToken,
          code: code,
        },
        {
          timeout: 10000,
        },
      );

      const { access_token, role } = response.data;

      login(access_token, role);

      if (role === "admin") {
        // Redirigir a dashboard o upload según el rol
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/upload");
      } else {
        setError("Rol no válido");
      }
      
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("El servidor tarda demasiado en responder");
      } else if (err.response) {
        setError(err.response.data.detail || "Código inválido");
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  };

  return (
    <div>
      <h2>Verificación 2FA</h2>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Código de Google Authenticator"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login2FA;
