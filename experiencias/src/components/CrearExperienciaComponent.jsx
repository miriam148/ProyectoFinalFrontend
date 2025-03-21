import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { AuthContext } from "../context/AuthContext";


/*AQUÍ CREO LA EXPERIENCIA Y LA IMAGEN TAMBIÉN ( EN LA EDICIÓN  ES DND VOY A SEPARAR LA EDICIÓN 
DE TEXTO JSON.STRINGIFT()  DE LA EDICION DE IMAGENES POR USAR FORMDATA, ES MEJOR NO MEZCLARLOS)
*/

const CrearExperienciaComponent = () => {
  const {token} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null, //aqui ahora metemos el archivo en lo que antes era un string
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para manejar cambios en los inputs de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // Maneja la selección del archivo
 const handleFileChange = (e) => {
  setFormData({ ...formData, image: e.target.files[0] });
};


  // Función para enviar el formulario (AQUÍ CAMBAIMOS )
  // console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // const token = localStorage.getItem("token"); //voy a probar si tiene algo que ver con el refresh token!!!!!, asi estoy utilizando el useState!!!! con esto descomentado no!!!!
      if (!token) {
        setError('Inicia sesión para crear una experiencia')
        return
      }

  // Creamos el FormData para enviar datos + archivo
  const dataToSend = new FormData();
  dataToSend.append("title", formData.title);
  dataToSend.append("description", formData.description);
  dataToSend.append("location", formData.location);
  dataToSend.append("image", formData.image); // Aquí va el archivo




      const response = await fetch("http://localhost:3001/api/experience", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",(YA SOLO SE GESTIONA CON FORMDATA )
          "auth-token": token,
        },
        body: dataToSend, //no usamos json
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
          type="file"
          name="image"
          
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {error && <p className="error-message">{error}</p>}

        <div className="botones-container">
          <button type="submit" className="crear-btn">✍Crear</button>
          <button type="button" className="volver-btn" onClick={() => navigate(-1)}>⬅ Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearExperienciaComponent;
