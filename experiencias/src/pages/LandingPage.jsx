import { Link } from "react-router-dom";
import "../style.css"; 

/*página principal dnd resumidamente explica la app, cada botón te lleva a una página diferente, según si estas registrado te lleva a logearte
 o si no te lleva al registro por eso aqui uso link y no navigate, pq el usuario tiene que clickar, yo no lo redirijo */

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>El viaje de tu vida</h1>
      <p>Una guía completa sobre lugares y rutas que no te dejarán indiferente</p>
      <p>Únete, comparte y descubre los viajes que han sido o serán inolvidables</p>
      <div className="landing-buttons">
        <Link to="/login">
          <button className="btn-primary">Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button className="btn-secondary">Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
