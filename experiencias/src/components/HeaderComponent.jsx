import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style/Header.css";

const HeaderComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    setTimeout(() => navigate("/"), 0); /*no me funciona solo con navigate, pq a react no le da tiempo a limpiar todo  cuando hago logout
    y no me llevaba a la principal, con setTimeout le estamos diciendo que se espere a que se limpie y ejecuta navigate */
     
  }

  return (
    <header className="header">
      <h1 onClick={() => navigate("/home")}>🌍 Experiencias de Viaje</h1>

      <nav>
        {user ? (
          <>
            <button onClick={() => navigate("/experiencias")}>📸 Experiencias</button>
            <button onClick={() => navigate("/perfil")}>👤 Mi Perfil</button>
            <button onClick={handleLogout}>🚪 Cerrar Sesión</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>🔑 Iniciar Sesión</button>
            <button onClick={() => navigate("/register")}>📝 Registrarse</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default HeaderComponent;
