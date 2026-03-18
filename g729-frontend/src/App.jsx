import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import DataConsult from "./pages/admin/DataConsult";
import Logs from "./pages/admin/Logs";
import Admin from "./pages/admin/Admin";
import Upload from "./pages/Upload";

function UploadRoute() {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") {
    return (
      <AdminLayout>
        <Upload />
      </AdminLayout>
    );
  }

  return <Upload />;
}

function App() {
  return (
    <>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Ruta usuario logeado */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <UploadRoute />
            </ProtectedRoute>
          }
        />

        {/* Rutas admin (incluye adminlayout) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<DataConsult />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
