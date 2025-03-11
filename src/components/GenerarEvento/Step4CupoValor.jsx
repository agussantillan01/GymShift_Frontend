import React from 'react';
import "../../assets/styles/GenerarEvento/Step4CupoValor.css";
export default function Step4CupoValor({ formData, handleChange }) {
  return (
    <div className="step">
      <h3>Paso 4: Cupo y valor</h3>
      <div>
      <input type="number" name="cupoMaximo" placeholder="Cupo máximo" value={formData.cupoMaximo} onChange={handleChange} />
      <input type="number" name="valor" placeholder="Valor" value={formData.valor} onChange={handleChange} />
      </div>

    </div>
  );
}