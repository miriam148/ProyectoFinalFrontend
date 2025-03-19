
//probando pq no me sirve el refresh token
//SIGUE SIN FUNCIONAR, DEL BACK NO ES PROBLEMA PQ ME DEVUELVE LOS DOS, EL PROBLEMA ESTA EN EL FRONT Y NO ENCUENTRO LA MANERA
// token a 60 min para que me deje trabajar mas tiempo
// compruebo en consola y me devuelve desde el back y desde el front los dos token y el usuario. en localstorage esta todo guardado, pero no refrescaaaaa

// En utils/fetchWithRefresh.js
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const fetchWithRefresh = async (url, options = {}) => {
  const { login, user } = useContext(AuthContext);  // 👈 accede a login()

  try {
    let accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    const makeRequest = async (tokenToUse) => {
      return await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
          "auth-token": tokenToUse,
        },
      });
    };

    let response = await makeRequest(accessToken);

    if (response.status === 401 || response.status === 403) {
      const refreshResponse = await fetch("http://localhost:3001/api/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token_refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Sesión expirada. Inicia sesión de nuevo.");
      }

      const refreshData = await refreshResponse.json();
      localStorage.setItem("token", refreshData.token);
      localStorage.setItem("refreshToken", refreshData.token_refresh);

      // 🔎 ¡ACTUALIZAR CONTEXTO GLOBAL!
      if (login && user) {
        login(user, refreshData.token, refreshData.token_refresh);
      }

      // Reintentar
      response = await makeRequest(refreshData.token);
    }

    return response;
  } catch (error) {
    console.error("Error en fetchWithRefresh:", error);
    throw error;
  }
};
