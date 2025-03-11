import React from 'react';
import "../../assets/styles/GenerarEvento/Step1Modalidad.css";

export default function Step1Modalidad({ formData, handleChange }) {
  return (
    <div className="step step1-modalidad">
      <div className="custom-select">
        <h3>Paso 1: Selecciona la modalidad</h3>
        <select name="modalidad" value={formData.modalidad} onChange={handleChange}>
          <option value="">Selecciona una modalidad</option>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
        </select>
      </div>
    </div>
  );
}
