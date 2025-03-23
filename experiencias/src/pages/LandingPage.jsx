
import "../style/LandingPage.css"

/*página principal dnd resumidamente explica la app y una foto principal es desde el header dnd empiezas a interactuar*/

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Llena tu vida de aventuras</h1>
      <p>Una guía completa sobre lugares y rutas que no te dejarán indiferente</p>
      <p>Únete, comparte y descubre experiencias de viaje únicas alrededor del mundo </p>
      <img src="/images/imagenDos.jpg" alt="Foto portada" className="landing-img" />
    </div>
  );
};

export default LandingPage;
