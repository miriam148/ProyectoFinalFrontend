import { Link } from "react-router-dom";
// import "../style.css"; 
import "../style/LandingPage.css"

/*página principal dnd resumidamente explica la app, cada botón te lleva a una página diferente, según si estas registrado te lleva a logearte
 o si no te lleva al registro por eso aqui uso link y no navigate, pq el usuario tiene que clickar, yo no lo redirijo */

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Llena tu vida de aventuras</h1>
      <p>Una guía completa sobre lugares y rutas que no te dejarán indiferente</p>
      <p>Únete, comparte y descubre experiencias de viaje únicas alrededor del mundo </p>
      {/* <div className="landing-buttons">
        <Link to="/login">
          <button className="btn-primary">Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button className="btn-secondary">Registrarse</button>
        </Link>
      </div> */}
      <img src="/images/imagenDos.jpg" alt="Foto portada" className="landing-img" />
    </div>
  );
};

export default LandingPage;
