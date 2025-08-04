import React from "react";
import "../../assets/styles/GenerarEvento/Step2FechasHorarios.css";

export default function Step2FechasHorarios({ formData, handleChange }) {
  return (
    <div className="step">
      <h3 className="step-title">Paso 2: Fechas y horarios</h3>

      <div className="row">
        <label className="form-label">
          Inicio:
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Fin:
          <input
            type="date"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleChange}
            className="form-input"
          />
        </label>
      </div>

      <div className="row">
        <label className="form-label">
          Hora:
          <select
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            className="form-input"
          >
            {Array.from({ length: 48 }).map((_, i) => {
              const horas = String(Math.floor(i / 2)).padStart(2, "0");
              const minutos = i % 2 === 0 ? "00" : "30";
              const valor = `${horas}:${minutos}`;
              return (
                <option key={valor} value={valor}>
                  {valor}
                </option>
              );
            })}
          </select>
        </label>

        <label className="form-label">
          Duración:
          <input
            type="number"
            name="duracion"
            placeholder="Minutos"
            value={formData.duracion}
            onChange={handleChange}
            className="form-input"
          />
        </label>
      </div>
    </div>
  );
}
