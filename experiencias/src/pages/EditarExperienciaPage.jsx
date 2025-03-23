import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ExperienceEditPage.css"

//página para editar la experiencia 

const EditarExperienciaPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL de esa experiencia en concreto 
  const navigate = useNavigate();
  //manejamos los estados del formulario y los errores, si falla se muestra y se limpia
  const [experiencia, setExperiencia] = useState({
    title: "",
    description: "",
    location: "",
    image: ""
  });
  const [error, setError] = useState(null);

  // Cargar la experiencia actual con llamada al back por el id y con token 
  useEffect(() => {
    const fetchExperiencia = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Debes iniciar sesión para editar.");
          return;
        }

        const response = await fetch(`http://localhost:3001/api/experience/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "No se pudo cargar la experiencia.");
        setExperiencia(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExperiencia();
  }, [id]);

  
//SOLO EDITA EL CREADOR DE LA EXPERIENCIA 
  /*Manejo de cambios en el formulario, con la copia de lo que no se modifica (...experiencia) y solo cambia el valor del campo nombre
   (title/location/description, etc) y se setea
   NOTA: en el mismo input al final readOnly para que no se pueda editar un campo, tambien en un <p></p> */
  const handleChange = (e) => {
    setExperiencia({ ...experiencia, [e.target.name]: e.target.value });
  };

  // Envío del formulario, llamas back, compruebas token y si todo ok se edita y vuelves a la experiencia editada
  const handleSubmit = async (e) => {
    e.preventDefault(); //siempre para prevenir la carga de la página
    try {
      const token = localStorage.getItem("token"); //si hay token pasas, sino inicias sesión
      if (!token) {
        setError("Debes iniciar sesión para editar.");
        return;
      }

      const response = await fetch(`http://localhost:3001/api/experience/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(experiencia),
      });

      if (!response.ok) throw new Error("Solo el creador de la experiencia puede editarla");

      navigate(`/experiencia/${id}`); // Volver a la página de detalles
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="editar-experiencia-container">
      <h1>Editar Experiencia</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" name="title" value={experiencia.title} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="description" value={experiencia.description} onChange={handleChange} required />

        <label>Ubicación:</label>
        <input type="text" name="location" value={experiencia.location} onChange={handleChange} required />

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarExperienciaPage;
