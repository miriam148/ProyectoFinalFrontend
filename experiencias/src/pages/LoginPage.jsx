
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Guarda los datos del usuario y los tokens
import "../style.css"; 

/* página de inicio de sesión, llamada al servidor con los datos metodo post,  */ 
const LoginPage = () => {
  const [email, setEmail] = useState(""); // manejan los estados y los guardan 
  const [password, setPassword] = useState(""); // manejan los estados y los guardan
  const [error, setError] = useState(null); // manejan los estados y los guardan
  const navigate = useNavigate(); //para que te redirija si es ok 
  const { login } = useContext(AuthContext); // guarda tokens y user(viene de authcontext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar error anterior

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", { //llama al back con el endpoint que he creado
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) { //manejo de errores
        throw new Error(data.message || "Error en el inicio de sesión");
      }
//login viene de authContext
      login(data.user, data.token, data.token_refresh); //console.log(data.token) Guardar usuario con los dos token 
      navigate("/home"); // Redirigir a Home después de iniciar sesión
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Entrar</button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default LoginPage;
