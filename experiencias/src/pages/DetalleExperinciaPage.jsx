import React from 'react'
import {useState, useEffect } from "react" 
import { useNavigate, useParams } from 'react-router-dom'


const DetalleExperinciaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experiencia, setExperiencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


//para cargar la experiencia con el id
useEffect(() => {
    const fetchExperiencia = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtiene el token almacenado
  if (!token) {
    setError('Inicia sesión para editar experiencia')
  }
  if (!id || id.length !== 24) { //verificacion de id pq me esta dando problemas
    setError("ID de experiencia inválido");
    return;
  }
  
        const response = await fetch(`http://localhost:3001/api/experience/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-token": token, //Enviar el token
          },
        });
  
        const data = await response.json();
        setExperiencia(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExperiencia();
  }, [id]);
  

 //eliminar  experiencia
 const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")  
      if (!token) {
        setError('Solo puedes eliminar tus experiencias')
      }
      const response = await fetch(`http://localhost:3001/api/experience/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Auth-token": token, //Enviar el token
          },
      });
      if (!response.ok) throw new Error("Solo puedes eliminar tus experiencias");
      alert("Experiencia eliminada exitosamente.");
      navigate("/experiencias"); //vuelta a listado
    } catch (error) {
      alert(error.message);
    }
  };

  //  Redirigir a la página de edición cuando la cree
  const handleEdit = () => {
    navigate();
  };

  //  cancela y vuelves atrás
  const handleCancel = () => {
    navigate(-1);
  };

  //  mensaje mientras carga
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!experiencia) return <p>No se encontró la experiencia.</p>;


//VER PQ ME COGE USUARIO DESCONOCIDO EN VEZ DEL USUARIO 

  return (
    <div className="detalle-container">
      <h1>{experiencia.title}</h1>
      <p><strong>Ubicación:</strong> {experiencia.location}</p>
      <p>{experiencia.description}</p>
      <p><strong>Fecha:</strong> {new Date(experiencia.date).toLocaleDateString()}</p>
      {experiencia.image && <img src={experiencia.image} alt={experiencia.title} className="detalle-img" />}
      
     {/* {experiencia.user && <p><strong>Publicado por:</strong> {experiencia.user.name || "Usuario desconocido"}</p>} */}
      
      <div className="botones-container">
        <button className="editar-btn" onClick={handleEdit}>✏️ Editar</button>
        <button className="eliminar-btn" onClick={handleDelete}>🗑️ Eliminar</button>
        <button className="cancelar-btn" onClick={handleCancel}>⬅ Cancelar</button>
      </div>
    </div>
  );

  
};

export default DetalleExperinciaPage
