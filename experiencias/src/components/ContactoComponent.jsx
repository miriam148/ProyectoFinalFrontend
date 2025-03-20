import React from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";

/* target es para que se abra en otra pantalla y MUY RECOMENDABLE usar rel= noopener noreferrer para evitar ataques y mejora seguridad*/

const ContactoComponent = () => {
const navigate = useNavigate()
  const handlerBack = () => {
    navigate("/home")
  }
  return (
    <div className="contacto-container">
      {/* <h1>Contacto</h1> */}
      <p>
        <strong>Miriam Ibáñez Muñoz</strong> 
      </p>
<div className="iconos-container">
<a href="https://www.linkedin.com/in/miriam-ib%C3%A1%C3%B1ez-mu%C3%B1oz-983864283/" target="_blank" rel="noopener noreferrer">
        <img src="/images/linkedin.png" alt="Linkedin" width="32" height="32"/>
      </a>
<a className="icon-phone" href="tel:655181239" target="_blank" rel="noopener noreferrer">
  <img src="/images/telefono.png" alt="Teléfono" width="25" height="22" />
</a>
      <a href="https://github.com/miriam148" target="_blank" rel="noopener noreferrer">
        <img src="/images/github.png" alt="GitHub" width="30" height="30"  />
      </a>
      <a href="mailto:miriamibanezmunoz148@gmail.com" target="_blank" rel="noopener noreferrer">
        <img src="/images/email.png" alt="icono email" width="30" height="30"  />
      </a>
</div>
<div className="button-container">
  <button  className="volver-btn-contacto" onClick={handlerBack}>⬅ Volver</button>
</div>
      
    </div>
  );
};

export default ContactoComponent;
