import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); 

/*CON EL CONTEXTO GLOBAL DE AUTHCONTEXT ALMACENO LOS DATOS DEL USUARIO Y EL TOKEN  */

const AuthProvider = ({ children }) => { //TODOS LOS COMPONENTES DENTRO DE AUTHPROVIDER, ENVUELVE TODO Y ASI LO PUEDO USAR EN TODOS ELLOS
  const [user, setUser] = useState(null); //guarda y actualiza
  const [token, setToken] = useState(null);//guarda y actualiza
/*TOKEN SE USA EN CADA REQUEST ASI QUE LO METEMOS EN ESTADO GLOBAL O LUGAR DE FACIL ACCESO Y LO ACTUALIZAMOS CUANDO SE RENUEVE
TOKEN REFRESH no es necesario hacer USESTATE, mejor se guarda en localStorage o cookie seguro)*/ 


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

// ✅ Añadido: fetchConAuth para manejar la expiración del token
const fetchConAuth = async (url, options = {}) => {
  let currentToken = localStorage.getItem("token");

  options.headers = {
    ...(options.headers || {}),
    "auth-token": currentToken, // en vez de Authorization
    // No pongas Content-Type si estás usando FormData

    // Authorization: `Bearer ${currentToken}`,
    // "Content-Type": "application/json"
  };

  let response = await fetch(url, options);

  // Si el token expiró (401), intenta refrescar
  if (response.status === 401 || response.status === 400) {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    const refreshRes = await fetch("http://localhost:3001/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token_refresh: storedRefreshToken })
    });

    const refreshData = await refreshRes.json();

    if (refreshRes.ok) {
      // Guardar nuevos tokens
      setToken(refreshData.token);
      localStorage.setItem("token", refreshData.token);
      localStorage.setItem("refreshToken", refreshData.token_refresh);

      // Repetir petición original con nuevo token
      options.headers.Authorization = `Bearer ${refreshData.token}`;
      response = await fetch(url, options);
    } else {
      // Si el refresh falla, cerrar sesión
      logout();
      throw new Error("Sesión expirada. Vuelve a iniciar sesión.");
    }
  }

  return response;
};

//los componentes pueden usar user/token/login/logout... children representa todo lo que este dentro de authcont y 
// como en main.jsx lo he envuelto entero a la app...SIN LOS CHILDREN authprovider no podria envolver app y los componentes no tendrian acceso a authContext

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchConAuth }}> 
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
