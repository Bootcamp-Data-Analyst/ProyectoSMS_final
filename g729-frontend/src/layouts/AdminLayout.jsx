import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/LogoHorMixto.png";
import "../styles/App.css";

function AdminLayout({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logs", path: "/logs" },
    { name: "Users", path: "/users" },
    { name: "Datasets", path: "/data" },
    { name: "Upload", path: "/upload" },
  ];

  // Obtener nombre de usuario (o usar 'Admin' por defecto)
  const username = user?.email ? user.email.split('@')[0] : "Admin";

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <img src={logo} alt="Logo Corporativo" className="logo-mini" />
        
        <div className="sidebar-welcome">
          Bienvenido,<br />
          <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
            {username}
          </span>
        </div>

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "sidebar-link-active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        {children || <Outlet />}
      </div>
    </div>
  );
}

export default AdminLayout;
