import { useState, useContext } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; 
import { AuthContext } from "../context/AuthContext";

Modal.setAppElement("#root"); 

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [tempToken, setTempToken] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const FAKE_MODE = true; // Cambiar a false para usar backend real

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Introduce email y contraseña");
      return;
    }

//////////////////////////////////////////////////////////////////////////

    if (FAKE_MODE) {
      // Modo fake para pruebas sin backend
      if (email === "admin@g729.com" && password === "123456") {
        // Credenciales de prueba para admin
        setTempToken("fake-token-123"); // token temporal inventado
        setShow2FAModal(true);
      } else {
        setError("Credenciales incorrectas (modo fake)");
      }
      return;
    }
///////////////////////////////////////////////////////////////////////////
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/login", {
        // Cambia esta URL por la de tu backend
        email,
        password,
      });

      if (response.data.requires_2fa) {
        setTempToken(response.data.temp_token);
        setShow2FAModal(true); // Mostrar modal 2FA
      }
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setError("");

    if (!code || code.length !== 6) {
      setError("Introduce un código válido de 6 dígitos");
      return;
    }
/////////////////////////////////////////////////////////////////////////////
    if (FAKE_MODE) { // Modo fake para pruebas sin backend
      // Código inventado: siempre pasa si es "123456"
      if (code === "123456") {
        login("fake-jwt-token", email === "admin@g729.com" ? "admin" : "user"); // Credenciales inventadas
        setShow2FAModal(false);

        if (email === "admin@g729.com") {
          navigate("/dashboard");
        } else {
          navigate("/upload");
        }
      } else {
        setError("Código incorrecto (modo fake)");
      }
      return;
    }
/////////////////////////////////////////////////////////////////////////////
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/verify-2fa", {
        // Cambia esta URL por la de tu backend
        token: tempToken,
        code: code,
      });

      const { access_token, role } = response.data;

      login(access_token, role);
      setShow2FAModal(false);

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/upload");
      }
    } catch (err) {
      setError("Código incorrecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login G729</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Verificando..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Modal 2FA */}
      <Modal
        isOpen={show2FAModal}
        onRequestClose={() => setShow2FAModal(false)}
        contentLabel="Autenticación 2FA"
        style={{
          content: { maxWidth: "400px", margin: "auto", padding: "20px" },
        }}
      >
        <h3>Introduce tu código 2FA</h3>
        <form onSubmit={handleVerify2FA}>
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
        <button onClick={() => setShow2FAModal(false)}>Cancelar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal>
    </div>
  );
}

export default Login;
