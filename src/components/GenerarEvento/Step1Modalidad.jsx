import React, { useState, useEffect } from 'react';
import "../../assets/styles/GenerarEvento/Step1Modalidad.css";
import { GetDeportesXusuario } from "../../api/TipoEventoService"; //from "../api/TipoEventoService";

const Step1Modalidad = ({ formData, handleChange }) => { 
  const [tiposEventos, setTiposEventos] = useState([]);

  useEffect(() => {
    const fetchTiposEventos = async () => {
      try {
        const data = await GetDeportesXusuario();
        console.log("EVENTOS: ", data);
        setTiposEventos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener los tipos de eventos:", error);
        setTiposEventos([]);
      }
    };

    fetchTiposEventos();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="step step1-modalidad">
      <div className="custom-select">
        <h3>Paso 1: Selecciona la modalidad y la actividad</h3>
        <label className="title-lbl">Modalidad: </label>
        <select name="modalidad" value={formData.modalidad} onChange={handleChange}>
          <option value="">Selecciona una modalidad</option>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
        </select>
      </div>

      <div className="custom-select">
        <label className="title-lbl">Actividad: </label>
        <select name="actividad" value={formData.actividad} onChange={handleChange}>
          <option value="">Selecciona una actividad</option>
          {tiposEventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step1Modalidad;
