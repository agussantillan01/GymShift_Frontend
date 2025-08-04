import React, { useState, useEffect, useCallback } from 'react';
import "../../assets/styles/GenerarEvento/Step1Modalidad.css";
import { GetDeportesXusuario } from "../../api/TipoEventoService";
import { GetModalidades } from "../../api/ModalidadesService";

const Step1Modalidad = ({ formData, handleChange }) => { 
  const [tiposEventos, setTiposEventos] = useState([]);
  const [tipoModalidad, setTipoModalidad] = useState([]);
  const [fieldComplete, setFieldComplete] = useState([false]);
  const fetchTiposEventos = useCallback(async () => {
    try {
      const data = await GetDeportesXusuario();
      setTiposEventos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los tipos de eventos:", error);
    }
  }, []);

  const fetchTiposModalidad = useCallback(async () => {
    try {
      const data = await GetModalidades();
      setTipoModalidad(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error("Error al obtener los tipos de modalidades:", error);
    }
  }, []);

  useEffect(() => {
    fetchTiposEventos();
    fetchTiposModalidad();
  }, [fetchTiposEventos, fetchTiposModalidad]);

  return (
    <div className="step step1-modalidad">
      <div className="custom-select">
        <h3>Paso 1: Selecciona la modalidad y la actividad</h3>
        <label className="title-lbl">Modalidad: </label>
        <select name="modalidad" value={formData.modalidad} onChange={handleChange}>
          <option value="">Selecciona una modalidad</option>
          {tipoModalidad.map((modalidad) => (
            <option key={modalidad.id} value={modalidad.id}>
              {modalidad.modalidad} 
            </option>
          ))}
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
