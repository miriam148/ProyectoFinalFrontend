import React from 'react';
import "../style.css"; 

const ContactoComponent = () => {
  return (
    <div className="contacto-container">
      <h1>Contacto</h1>
      <p><strong>Teléfono:</strong> <a href="tel:655181239">655 181 239</a></p>
      <p><strong>Nombre:</strong> Miriam Ibáñez Muñoz</p>
      <p><strong>GitHub:</strong> <a href="https://github.com/miriam148" target="_blank" rel="noopener noreferrer">github.com/miriam148</a></p>
      <p><strong>Email:</strong> <a href="mailto:miriamibanezmunoz148@gmail.com">miriamibanezmunoz148@gmail.com</a></p>
    </div>
  );
};

export default ContactoComponent;
