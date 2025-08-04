import React, { useState } from 'react';
import Step1Modalidad from "../components/GenerarEvento/Step1Modalidad"; 
import Step2FechasHorarios from "../components/GenerarEvento/Step2FechasHorarios";
import Step3DiasDescripcion from "../components/GenerarEvento/Step3DiasDescripcion";
import Step4CupoValor from "../components/GenerarEvento/Step4CupoValor";
import FormNavigation from "../components/GenerarEvento/FormNavigation";
import "../assets/styles/GenerarEvento/GenerarEvento.css";
import {GenerarEvento as generarEventoAPI } from "../api/EventosService";
export default function GenerarEvento() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    modalidad: '',
    fechaInicio: '',
    fechaFin: '',
    horario: '',
    duracion: '',
    dias: [],
    descripcion: '',
    cupoMaximo: '',
    valor: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        dias: checked
          ? [...prev.dias, value]
          : prev.dias.filter(dia => dia !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderSteps = () => {
     return (
       <>
         <Step1Modalidad formData={formData} handleChange={handleChange} />
         <Step2FechasHorarios formData={formData} handleChange={handleChange} />
         <Step3DiasDescripcion formData={formData} handleChange={handleChange} />
         <Step4CupoValor formData={formData} handleChange={handleChange} />
       </>
     );
  };

  const handleSubmit = async () => {

    try {
      const response = await generarEventoAPI(formData);
      alert("Evento generado correctamente.");
    } catch (error) {
      console.error("Error al generar el evento:", error);
      alert("Hubo un error al generar el evento.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-steps" style={{ transform: `translateX(-${(step - 1) * 100}%)` }}>
        {renderSteps()}
      </div>

      <FormNavigation 
        step={step}
        totalSteps={4}
        onPrev={prevStep}
        onNext={nextStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
