import React from 'react';

export default function FormNavigation({ step, totalSteps, onPrev, onNext, onSubmit }) {
  console.log("Desde Form navigation: ", step);
  console.log("Desde Form navigation: ", totalSteps);
  console.log("Desde Form navigation: ", onPrev);
  console.log("Desde Form navigation: ", onNext);
  console.log("Desde Form navigation: ", onSubmit);
  return (
    <div className="form-navigation">
      {step > 1 && <button onClick={onPrev}>Anterior</button>}
      {step < totalSteps && <button onClick={onNext}>Siguiente</button>}
      {step === totalSteps && <button onClick={onSubmit}>Enviar</button>}
    </div>
  );
}