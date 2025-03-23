import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "../style/ProfilePage.css";
import CambiarFotoPerfil from "../components/CambiarFotoPerfil";

const PerfilPage = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
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
        setPerfil(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu perfil?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/user/${perfil._id}`,
        { method: "DELETE", headers: { "auth-token": token } }
      );
      if (!response.ok) throw new Error("No se pudo eliminar el perfil.");
      alert("Perfil eliminado correctamente.");
      logout();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = () => {
    navigate("/editar-perfil");
  };

  const handlerBack = () => {
    navigate("/home")
  }

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>
      <img
            src={`http://localhost:3001/${user.profilePic}`}
            alt="Tu foto de perfil"
            width="150"
          />
      {/* <CambiarFotoPerfil/>  */}

      <p><strong>Nombre:</strong> {perfil.name}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Fecha de nacimiento:</strong> {new Date(perfil.birthdate).toLocaleDateString()}</p>
      <p><strong>Código postal:</strong> {perfil.postcode || "No indicado"}</p>
      <p><strong>¿Eres aventurero?:</strong> {perfil.isAdventurous ? "Sí" : "No"}</p>

      <div className="perfil-botones">
        <button onClick={handleEdit} className="editar-btn">✏️ Editar Perfil</button>
        <button onClick={handleDelete} className="eliminar-btn">🗑️ Eliminar Perfil</button>
        <button onClick={handlerBack} className="volver-btn">⬅ Volver</button>
      </div>
    
    </div>
  );
};

export default PerfilPage;
