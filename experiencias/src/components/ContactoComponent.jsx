import React from "react";
import "../style.css";

const ContactoComponent = () => {
  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <p>
        <strong>Nombre:</strong> Miriam Ibáñez Muñoz
      </p>
      <p>
        <strong>Teléfono:</strong> <a href="tel:655181239">655 181 239</a>
      </p>

      <a href="https://github.com/miriam148" target="_blank">
        <img src="/images/github.png" alt="GitHub" width="30" height="30" />
      </a>
      <a href="mailto:miriamibanezmunoz148@gmail.com">
        <img src="/images/email.png" alt="icono email" width="30" height="30" />
      </a>
    </div>
  );
};

export default ContactoComponent;
