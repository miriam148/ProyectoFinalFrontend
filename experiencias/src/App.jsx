
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PerfilPage from "./pages/PerfilPage";
import ExperienciaPage from "./pages/ExperienciaPage";
import ContactoComponent from "./components/ContactoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import PrivateComponent from "./components/PrivateComponent";
import CrearExperienciaComponent from "./components/CrearExperienciaComponent";
import DetalleExperinciaPage from "./pages/DetalleExperinciaPage";
import './App.css';
import EditarExperienciaPage from "./pages/EditarExperienciaPage";
import EditarPerfilPage from "./pages/EditarPerfilPage";
import CambiarFotoExperienceComponent from "./components/CambiarFotoExperienceComponent"
function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         {/* Rutas privadas protegidas, las envuelvo por el privateComponent */}
         <Route element={<PrivateComponent/>}>
         <Route path="/home" element={<HomePage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/experiencias" element={<ExperienciaPage />} />
        <Route path="/quienes-somos" element={<ContactoComponent />} />
         <Route path="/crear-experiencia" element={<CrearExperienciaComponent/>}/>
         <Route path="/experiencia/:id" element={<DetalleExperinciaPage/>}/>
         <Route path="/editar-experiencia/:id" element={<EditarExperienciaPage/>}/>
         <Route path="/editar-perfil" element={<EditarPerfilPage/>}/>
         <Route path="/cambiar-foto/:id" element={<CambiarFotoExperienceComponent/>}/>

         </Route>
        
      </Routes>
      <FooterComponent />
    </Router>
  );
}


export default App
