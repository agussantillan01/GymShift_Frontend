import "../../assets/styles/GenerarEvento/Step3DiasDescripcion.css";
import React, { useState } from 'react';

export default function Step3DiasDescripcion({ formData, handleChange }) {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const [diasSeleccionados, setDiasSeleccionados] = useState(formData.dias || []);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDiaClick = (dia) => {
    const updatedDias = diasSeleccionados.includes(dia)
      ? diasSeleccionados.filter(d => d !== dia)
      : [...diasSeleccionados, dia];

    setDiasSeleccionados(updatedDias);

    handleChange({
      target: {
        name: 'dias',
        value: updatedDias,
      },
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="step">
      <h3>Paso 3: Días y descripción</h3>

      <label className="form-label">
        Selecciona los días:
        <div className="dias-dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {isDropdownOpen ? 'Cerrar días' : 'Abrir días'}
          </button>

          {isDropdownOpen && (
            <div className="dias-list">
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  className={`dias-item ${diasSeleccionados.includes(dia) ? 'selected' : ''}`}
                  onClick={() => handleDiaClick(dia)}
                >
                  {dia}
                </div>
              ))}
            </div>
          )}
        </div>
      </label>

      <div className="descip">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Descripción del evento"
          value={formData.descripcion}
          onChange={handleChange}
          className="descripcion-input"
        />
      </div>
    </div>
  );
}
