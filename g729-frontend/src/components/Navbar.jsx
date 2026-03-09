import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#FFFFFF" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/upload">Subir archivo</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;