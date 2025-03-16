
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
import './App.css'

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         {/* Rutas privadas protegidas */}
         <Route element={<PrivateComponent/>}>
         <Route path="/home" element={<HomePage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/experiencias" element={<ExperienciaPage />} />
        <Route path="/quienes-somos" element={<ContactoComponent />} />
         <Route path="/crear-experiencia" element={<CrearExperienciaComponent/>}/>
         </Route>
        
      </Routes>
      <FooterComponent />
    </Router>
  );
}


export default App
