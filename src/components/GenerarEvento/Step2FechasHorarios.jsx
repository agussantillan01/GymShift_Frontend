import React from 'react';
import "../../assets/styles/GenerarEvento/Step2FechasHorarios.css";

export default function Step2FechasHorarios({ formData, handleChange }) {
  return (
    <div className="step">
      <h3 className="step-title">Paso 2: Fechas y horarios</h3>

      <div className="row">
        <label className="form-label">
          Inicio:
          <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Fin:
          <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} className="form-input" />
        </label>
      </div>

      <div className="row">
        <label className="form-label">
          Hora:
          <input type="time" name="horario" value={formData.horario} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Duración:
          <input type="number" name="duracion" placeholder="Minutos" value={formData.duracion} onChange={handleChange} className="form-input" />
        </label>
      </div>
    </div>
  );
}
