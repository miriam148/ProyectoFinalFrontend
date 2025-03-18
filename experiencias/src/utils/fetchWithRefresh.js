
//probando pq no me sirve el refresh token


export const fetchWithRefresh = async (url, options = {}) => {
  try {
    let accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("AccessToken que envío:", accessToken);
console.log("RefreshToken que envío:", refreshToken);


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

    // Hacemos la petición inicial
    let response = await makeRequest(accessToken);

    // 2️⃣ Si el token expiró, intentamos refrescar
    if (response.status === 401 || response.status === 403) {
      const refreshResponse = await fetch("http://localhost:3001/api/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Su sesión ha expirado.Por favor, vuelve a iniciar sesión.");
      }

      const refreshData = await refreshResponse.json();
      localStorage.setItem("token", refreshData.token);
      localStorage.setItem("refreshToken", refreshData.token_refresh);

      // 3️⃣ Reintentamos la petición original con el nuevo token
      response = await makeRequest(refreshData.token);
    }

    return response;
  } catch (error) {
    console.error("Error en fetchWithRefresh:", error);
    throw error;
  }
};
