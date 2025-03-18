import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); 

/*CON EL CONTEXTO GLOBAL DE AUTHCONTEXT ALMACENO LOS DATOS DEL USUARIO Y LOS TOKENS */

const AuthProvider = ({ children }) => { //TODOS LOS COMP DENTRO DE AUTHP
  const [user, setUser] = useState(null); //guarda y actualiza
  const [token, setToken] = useState(null);//guarda y actualiza

/*con este useEffect cada vez que recargamos la app no necesitamos logearnos si ya estabamos antes pq si hay datos en localStorage
guardamos en user y token. solo para mantener la sesion abierta, pq gestionamos globalmente la autenticacion no pq este la funcion de login
HASTA QUE NO HAGAMOS LOGOUT SEGUIMOS LOGIN*/
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
//ESTA FUNCION DE LOGIN LA USO EN LOGINPAGE
  const login = (userData, accessToken, refreshToken) => {
    setUser(userData); //GUARDA EN EL ESTADO
    setToken(accessToken); //GUARDA EN EL ESTADO
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken); //ESTOS 3 SE GUSRDAN EN EL LOCALSTORAGE
    localStorage.setItem("refreshToken", refreshToken);
  };
//PARA EL LOGOUT EN HEADER
  const logout = () => {
    setUser(null);//ELIMINA DE ESTADO GLOBAL LOS DATOS
    setToken(null);//ELIMINA DE ESTADO GLOBAL
    localStorage.removeItem("user");//ESTOS 3 LOCALSTORAGE BORRAN LOS DATOS
    localStorage.removeItem("token");//SE HACE UN CIERRE COMPLETO 
    localStorage.removeItem("refreshToken");
    
  };
//los componentes pueden usar user/token/login/logout... children representa todo lo que este dentro de authcont y 
// como en main.jsx lo he envuelto entero a la app...SIN LOS CHILDREN authprovider no podria envolver app y los componentes no tendrian acceso a authContext

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
