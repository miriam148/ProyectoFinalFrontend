import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/ProfileEditPage.css";
import CambiarFotoPerfil from "../components/CambiarFotoPerfil";

const EditarPerfilPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [perfil, setPerfil] = useState({
    name: "",
    email: "",
    birthdate: "",
    postcode: "",
    isAdventurous: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/user/myProfile", {
          headers: { "auth-token": token },
        });
        if (!response.ok) throw new Error("No se pudo obtener el perfil");
        const data = await response.json();
        setPerfil({
          name: data.name,
          email: data.email,
          birthdate: data.birthdate.substring(0, 10), // formato YYYY-MM-DD para el input date
          postcode: data.postcode || "",
          isAdventurous: data.isAdventurous,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const password = () => {
    navigate("/cambiar-contraseña")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(perfil),
      });
      if (!response.ok) throw new Error("Error al actualizar perfil.");
      alert("Perfil actualizado con éxito.");
      navigate("/perfil");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando datos del perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="editar-perfil-container">
      <h1>Editar Perfil</h1>
     <CambiarFotoPerfil/> 
      <form onSubmit={handleSubmit} className="editar-perfil-form">
        <input
          type="text"
          name="name"
          value={perfil.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={perfil.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          required
        />
        <input
          type="date"
          name="birthdate"
          value={perfil.birthdate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="postcode"
          value={perfil.postcode}
          onChange={handleChange}
          placeholder="Código Postal (opcional)"
        />
        <label>
          <input
            type="checkbox"
            name="isAdventurous"
            checked={perfil.isAdventurous}
            onChange={handleChange}
          /> Eres aventurero
        </label>
        <div className="editar-perfil-botones">
          <button type="submit" className="guardar-btn">💾 Guardar Cambios</button>
          <button type="button" className="cancelar-btn" onClick={() => navigate("/perfil")}>❌ Cancelar</button>
          <button type="button" className="guardar-btn" onClick={password}>🔑 Cambiar Contraseña</button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfilPage;
