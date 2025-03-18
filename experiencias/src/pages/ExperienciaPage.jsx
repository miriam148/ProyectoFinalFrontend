import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";


const ExperienciaPage = () => {
  const [experiencias, setExperiencias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperiencias = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/experience");
        const data = await response.json();
        setExperiencias(data);
      } catch (error) {
        console.error("Error al obtener las experiencias:", error);
      }
    };

    fetchExperiencias();
  }, []);

  return (
    <div className="experiencia-container">
      <h1>Experiencias de Viaje</h1>
      <div className="botones-container">
      <button className="crear-btn" onClick={() => navigate("/crear-experiencia")}>
        ➕ Crear Experiencia
      </button>
      <button className="volver-btn" onClick={() => navigate("/home")}>
      ⬅ Volver
      </button>
      </div>
      <div className="experiencia-list">
        {experiencias.length > 0 ? (
          experiencias.map((exp) => (
            <div key={exp._id} className="experiencia-card">
              <h2>{exp.title}</h2>
              <p><strong>Ubicación:</strong> {exp.location}</p>
              <p>{exp.description}</p>
              {/* {exp.image && <img src={exp.image} alt={exp.title} className="experiencia-img" />} */}
              <p><strong>Fecha:</strong> {new Date(exp.date).toLocaleDateString()}</p>
              {exp.user && <p><strong>Publicado por:</strong> {exp.user.name || "Usuario desconocido"}</p>}
              <button className="detalles-btn" onClick={() => navigate(`/experiencia/${exp._id}`)}>
                🔍 Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <p>No hay experiencias disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ExperienciaPage;
