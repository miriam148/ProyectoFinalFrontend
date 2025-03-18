import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const RegisterPage = () => {
  //todas las variables de estado de los campos de los input para el manejo
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [postcode, setPostcode] = useState("")
  const [isAdventurous, setIsAdventurous] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //no recarga
    setError(null); //borra mensaje de error para el proximo intento
    setSuccess(null); //borra mensaje de ok

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          postcode,
          password,
          birthdate: new Date(birthdate),
          isAdventurous,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      setSuccess("Usuario registrado con éxito");
      setTimeout(() => navigate("/login"), 2000); //el setTimeout lo uso para darle tiempo a que vea que se ha registrado ok
    } catch (error) {
      setError(error.message);
    }
  };
  const handlerBack = () => {
   navigate("/")
  }

  //el input de checkbox no usa value sino checked, ni placeholder y con label se mejora accesibilidad, lo puede clickar fuera de la casilla

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="number"
          placeholder="Código postal"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="register-input"
        />
        <label>
          <input
            type="checkbox"
            checked={isAdventurous}
            onChange={(e) => setIsAdventurous(e.target.checked)}
            className="register-input"
          />
          ¿Eres aventurero?
        </label>
        <button type="submit" className="register-button">
          Registrarse
        </button>
        <button  onClick={handlerBack} type="submit" className="register-button">
          Volver
        </button>
      </form>
      {error && <p className="register-error">{error}</p>}
      {success && <p className="register-success">{success}</p>}
    </div>
  );
};

export default RegisterPage;
