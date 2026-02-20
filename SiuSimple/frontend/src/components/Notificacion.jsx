import React, { useEffect } from 'react';
import './Notificacion.css';

const Notificacion = ({ tipo = 'info', mensaje, duracion = 5000, onCerrar }) => {
  useEffect(() => {
    if (duracion > 0) {
      const timer = setTimeout(() => {
        if (onCerrar) onCerrar();
      }, duracion);
      return () => clearTimeout(timer);
    }
  }, [duracion, onCerrar]);

  const iconos = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`notificacion notificacion-${tipo}`}>
      <span className="notificacion-icono">{iconos[tipo]}</span>
      <span className="notificacion-mensaje">{mensaje}</span>
      {onCerrar && (
        <button className="notificacion-cerrar" onClick={onCerrar}>✕</button>
      )}
    </div>
  );
};

export default Notificacion;