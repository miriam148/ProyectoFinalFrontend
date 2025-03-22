import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CambiarContraseñaPage = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      setError("La nueva contraseña no coincide.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      if (!response.ok) throw new Error("Error al cambiar la contraseña.");
      alert("Contraseña actualizada con éxito.");
      navigate("/perfil");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="editar-perfil-container">
      <h1>Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit} className="editar-perfil-form">
        <input
          type="password"
          name="currentPassword"
          placeholder="Contraseña actual"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nueva contraseña"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirmar nueva contraseña"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <div className="editar-perfil-botones">
          <button type="submit" className="guardar-btn">Cambiar contraseña</button>
          <button type="button" className="cancelar-btn" onClick={() => navigate("/perfil")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CambiarContraseñaPage;
