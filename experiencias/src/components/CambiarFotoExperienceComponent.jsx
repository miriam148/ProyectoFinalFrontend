import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style.css";

const CambiarFotoExperienceComponent = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor selecciona una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`http://localhost:3001/api/experience/${id}/image`, {
        method: "PUT",
        headers: {
          "auth-token": token,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("No se pudo actualizar la imagen.");

      alert("Imagen actualizada con éxito");
      navigate(`/experiencia/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cambiar-foto-container">
      <h2>Cambiar imagen de la experiencia</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="cambiar-foto-form">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="botones-container">
          <button type="submit">Actualizar imagen</button>
          <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CambiarFotoExperienceComponent;
