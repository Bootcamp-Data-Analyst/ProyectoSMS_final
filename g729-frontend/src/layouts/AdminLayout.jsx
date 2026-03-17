import { Link, Outlet, useLocation } from "react-router-dom"

function AdminLayout({ children }) {

  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logs", path: "/logs" },
    { name: "Users", path: "/users" },
    { name: "Datasets", path: "/data" },
    { name: "IP Allowlist", path: "/ip" },
    { name: "Upload", path: "/upload" }
  ]

  return (

    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>

        <h2>Admin Panel</h2>

        {menuItems.map(item => (

          <div key={item.path} style={{ margin: "10px 0" }}>

            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#38bdf8" : "white",
                textDecoration: "none"
              }}
            >
              {item.name}
            </Link>

          </div>

        ))}

      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        {children || <Outlet />}
      </div>

    </div>

  )

}

export default AdminLayout