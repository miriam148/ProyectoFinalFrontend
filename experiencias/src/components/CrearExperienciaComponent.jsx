import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { AuthContext } from "../context/AuthContext";

const CrearExperienciaComponent = () => {
  const {token} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar el formulario
  // console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        setError('Inicia sesión para crear una experiencia')
        return
      }

      const response = await fetch("http://localhost:3001/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al crear la experiencia");

      }

      navigate("/experiencias"); // Redirige a la lista de experiencias tras crear
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="crear-experiencia-container">
      <h1>Crear Nueva Experiencia</h1>
      <form onSubmit={handleSubmit} className="crear-experiencia-form">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen (opcional)"
          value={formData.image}
          onChange={handleChange}
        />
        
        {error && <p className="error-message">{error}</p>}

        <div className="botones-container">
          <button type="submit" className="crear-btn"> Crear</button>
          <button type="button" className="volver-btn" onClick={() => navigate(-1)}>⬅ Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearExperienciaComponent;
