
import { useNavigate } from "react-router-dom";
import "../style.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>El viaje de tu vida</h1>
      <p>Elige una opción:</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/experiencias")}>📸 Ver experiencias</button>
        <button onClick={() => navigate("/crear-experiencia")}>✍ Crear experiencia</button>
        <button onClick={() => navigate("/quienes-somos")}>ℹ ¿Quiénes somos?</button>
      </div>
    </div>
  );
};

export default HomePage;
