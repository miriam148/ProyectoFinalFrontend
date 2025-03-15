import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateComponent = () => {
  const { user } = useContext(AuthContext); 

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateComponent;


/*usamos context para tener el usuario autenticedo, si existe pasa a las rutas protegidas
sino va a login */