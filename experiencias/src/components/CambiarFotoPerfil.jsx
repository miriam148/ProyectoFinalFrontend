import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../style/ProfilePage.css";

const CambiarFotoPerfil = () => {
  const { token, user, login } = useContext(AuthContext); //actualizar el contexto globañ
  // token: para enviar autorización 
  // user: para acceder al usuario actual
  // login: para actualizar el usuario tras cambiar la foto

  const [file, setFile] = useState(null); // aquí guardamos la imagen seleccionada
  const [mensaje, setMensaje] = useState(""); // para mostrar mensajes al usuario

  // Esta función se ejecuta cuando envías el formulario(crea formdata, envia la imagen al back y actualiza el usuario con la nueva img)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!file) {
      setMensaje("Por favor, selecciona una imagen.");
      return;
    }

    try {
      // Creamos un FormData para enviar la imagen al backend:
      const formData = new FormData();
      formData.append("profilePic", file); //  esto es lo que recibe el back con multer.single("profilePic")

      // Petición al backend:
      const response = await fetch("http://localhost:3001/api/user/profile-pic", {
        method: "PUT",
        headers: {
          "auth-token": token, // enviamos el token para verificar usuario
        },
        body: formData, // aquí va la imagen
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar la foto");

      // actualizamos el usuario en el contexto:
      login(data, token, localStorage.getItem("refreshToken"));

      setMensaje("¡Foto de perfil actualizada con éxito!");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="cambiar-foto-container">
        <h4>Tu foto actual:</h4>
          <img
            src={`http://localhost:3001/${user.profilePic}`}
            alt="Tu foto de perfil"
            width="150"
          />
      <h3>Cambiar foto de perfil</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        { <button type="submit">Subir nueva foto</button> }
      </form>
      {mensaje && <p>{mensaje}</p>}

      {user?.profilePic && (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default CambiarFotoPerfil;
