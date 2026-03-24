import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/App.css";

function UserManagement() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para el formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [editingId, setEditingId] = useState(null); // ID del usuario en edición, null si es nuevo

  // URL base del backend (ajusta si es necesario, consistente con Login.jsx)
  const API_URL = "http://localhost:8000"; 

  // Cargar usuarios al montar el componente si es admin
  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Se asume que el backend devuelve un array de usuarios o un objeto con una propiedad data
      setUsers(Array.isArray(response.data) ? response.data : response.data.data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Error al cargar la lista de usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar el estado del formulario al cambiar los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || (!editingId && !formData.password)) {
      setError("Email y contraseña son obligatorios para crear usuario.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (editingId) {
        // Editar usuario existente
        const dataToSend = { ...formData };
        if (!dataToSend.password) delete dataToSend.password; // No enviar contraseña vacía al editar

        await axios.put(`${API_URL}/users/${editingId}`, dataToSend, { headers });
      } else {
        // Crear nuevo usuario
        await axios.post(`${API_URL}/users`, formData, { headers });
      }

      // Resetear formulario y recargar
      setFormData({ email: "", password: "", role: "user" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user", err);
      setError("Error al guardar el usuario en la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  // Editar usuario: cargar datos en el formulario y marcar el ID en edición
  const handleEdit = (userToEdit) => {
    setFormData({
      email: userToEdit.email,
      password: "", // Limpiar password por seguridad
      role: userToEdit.role || "user",
    });
    setEditingId(userToEdit.id);
  };

  // Eliminar usuario con confirmación
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
      setError("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  // Cancelar edición y resetear formulario
  const handleCancel = () => { 
    setFormData({ email: "", password: "", role: "user" });
    setEditingId(null);
    setError("");
  };

  if (!user || user.role !== "admin") {
    return <div style={{ padding: "20px", color: "red" }}>Acceso denegado. Solo administradores.</div>;
  }

  // Extraer nombre de usuario del email (o usar un valor por defecto)
  const username = user?.email ? user.email.split('@')[0] : "Admin";

  return (
    <div className="admin-container">
      <h1 className="admin-header">Bienvenido, {username}</h1>
      <h2 className="admin-subtitle">Gestión de Usuarios</h2>

      <div className="admin-form-box">
        <h3>{editingId ? "Editar Usuario" : "Crear Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <input className="form-input" style={{width: "auto", marginBottom: 0}} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input className="form-input" style={{width: "auto", marginBottom: 0}} type="password" name="password" placeholder={editingId ? "Nueva contraseña" : "Contraseña"} value={formData.password} onChange={handleInputChange} />
          <select className="form-input" style={{width: "auto", marginBottom: 0}} name="role" value={formData.role} onChange={handleInputChange}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button className="btn-action btn-create" type="submit" disabled={loading}>{editingId ? "Actualizar" : "Crear"}</button>
          {editingId && <button className="btn-action btn-cancel" type="button" onClick={handleCancel}>Cancelar</button>}
        </form>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="admin-table">
        <thead><tr><th>ID</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
        <tbody>
          {users.map((u) => (<tr key={u.id}><td>{u.id}</td><td>{u.email}</td><td>{u.role}</td><td><button className="btn-action btn-edit" onClick={() => handleEdit(u)}>Editar</button> <button className="btn-action btn-delete" onClick={() => handleDelete(u.id)}>Borrar</button></td></tr>))}
          {users.length === 0 && !loading && <tr><td colSpan="4">No hay usuarios.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;