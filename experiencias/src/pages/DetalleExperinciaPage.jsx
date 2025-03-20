import React from 'react'
import {useState, useEffect } from "react" 
import { useNavigate, useParams } from 'react-router-dom'


//DESDE ESTA PAGINA MUESTRO LA EXPERIENCIA POR EL ID Y PUEDO ELIMINAR SI SOY LA CREADORA Y EDITAR SI SOY LA CREADORA 


// const apiUrl = "http://localhost:3001/api/auth/refresh-token"

// async function renovarToken() {
//   const refreshToken = localStorage.getItem("refreshToken")
//   if (!refreshToken) return null;

//   try {
//     const response= await fetch(apiUrl, {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify({refreshToken})
//     });
//     if (!response.ok) throw new Error("imposible acceder refresh token");
//     const data= await response.json();
//     localStorage.setItem("token", data.accessToken)
//     return data.accessToken
//   } catch (error) {
//     console.log("error")
    
//   }
   


// }

const DetalleExperinciaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experiencia, setExperiencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


//para cargar la experiencia con el id (si hago logout me vuelve a funcionar) NO ME FUNCIONA EL REFRESH TOKEN !!!
useEffect(() => {
    const fetchExperiencia = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtiene el token almacenado
  if (!token) {
    setError('Inicia sesión para editar experiencia')
  }
  if (!id || id.length !== 24) { //verificacion de id pq me esta dando problemas(ok)
    setError("ID de experiencia inválido");
    return;
  }
  
        const response = await fetch(`http://localhost:3001/api/experience/${id}`, {   
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, //Enviar el token
          
          },
        });

        // if (response.status === 401 || response.status === 403) {
        //   console.log("token expirado")
        // };
        // const refresToken = await renovarToken()
        // if (!refresToken) {
        //   console.log("no hay token ")
        // }
        // response = await fetch(`http://localhost:3001/api/experience/${id}`, {   
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "auth-token": refresToken, //Enviar el token
          
        //   },
        // })
        //   if(!response.ok) throw new Error("error")
  
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
  

 //eliminar  experiencia (SOLO LOS CREADORES DE LA EXPERIENCIA PUEDEN BORRAR)
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
            "auth-token": token, //Enviar el token
          },
      });
      if (!response.ok) throw new Error("Solo puedes eliminar tus experiencias");
      alert("Experiencia eliminada exitosamente.");
      navigate("/experiencias"); //vuelta a listado
    } catch (error) {
      alert(error.message);
    }
  };

  //  Redirigir a la página de edición
  const handleEdit = () => {
    navigate(`/editar-experiencia/${id}`);
  };

  //  cancela y vuelves atrás
  const handleCancel = () => {
    navigate(-1);
  };

  //  mensaje mientras carga
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!experiencia) return <p>No se encontró la experiencia.</p>;


//VER PQ ME COGE USUARIO DESCONOCIDO EN VEZ DEL USUARIO (.POPULATE EN BACK NAME: USER ME DEVUELVE NOMBRE PQ EN MONGODB HAY ID DEL USER)

  return (
    <div className="detalle-container">
      <h1>{experiencia.title}</h1>
      <p><strong>Ubicación:</strong> {experiencia.location}</p>
      <p>{experiencia.description}</p>
      <p><strong>Fecha:</strong> {new Date(experiencia.date).toLocaleDateString()}</p>

      {experiencia.image && (
  <img
    src={`http://localhost:3001/${experiencia.image}`}
    alt={experiencia.title}
    className="detalle-img"
  />
)}

      
     {experiencia.user && <p><strong>Publicado por:</strong> {experiencia.user.name || "Usuario desconocido"}</p>}
      
      <div className="botones-container">
        <button className="editar-btn" onClick={handleEdit}>✏️ Editar</button>
        <button className="eliminar-btn" onClick={handleDelete}>🗑️ Eliminar</button>
        <button className="cancelar-btn" onClick={handleCancel}>⬅ Cancelar</button>
      </div>
    </div>
  );

  
};

export default DetalleExperinciaPage
