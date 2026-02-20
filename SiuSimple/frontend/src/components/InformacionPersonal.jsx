import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import datosPersonalesService from '../services/datosPersonalesService';
import './InformacionPersonal.css';

const InformacionPersonal = () => {
  const { user } = useAuth();
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  
  const [datos, setDatos] = useState({
    dni: user?.dni || '',
    nombre: '',
    fechaNacimiento: '',
    domicilio: '',
    telefono: '',
    email: ''
  });

  // Cargar datos desde la base de datos
  useEffect(() => {
    cargarDatos();
  }, [user]);

  const cargarDatos = async () => {
    if (!user?.dni) return;
    
    setCargandoDatos(true);
    const resultado = await datosPersonalesService.obtenerPorDNI(user.dni);
    
    if (resultado.success && resultado.data) {
      // Si hay datos en la BD, usarlos
      setDatos({
        dni: user.dni,
        nombre: resultado.data.nombre || user.nombre || '',
        fechaNacimiento: resultado.data.fechaNacimiento || '',
        domicilio: resultado.data.domicilio || '',
        telefono: resultado.data.telefono || '',
        email: resultado.data.email || user.email || ''
      });
    } else {
      // Si no hay datos, usar los del usuario
      setDatos({
        dni: user.dni,
        nombre: user.nombre || '',
        fechaNacimiento: '',
        domicilio: '',
        telefono: '',
        email: user.email || ''
      });
    }
    
    setCargandoDatos(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: value
    }));
    setMensajeExito('');
    setMensajeError('');
  };

  const handleGuardar = async () => {
    setCargando(true);
    setMensajeExito('');
    setMensajeError('');
    
    // Validaciones
    if (!datos.nombre || !datos.dni || !datos.email) {
      setMensajeError('Los campos nombre, DNI y email son obligatorios');
      setCargando(false);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      setMensajeError('El email no tiene un formato válido');
      setCargando(false);
      return;
    }
    
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(datos.dni)) {
      setMensajeError('El DNI debe tener 7 u 8 dígitos numéricos');
      setCargando(false);
      return;
    }
    
    const resultado = await datosPersonalesService.guardar(datos);
    
    if (resultado.success) {
      setMensajeExito('Guardado exitosamente');
      setTimeout(() => {
        setEditando(false);
        setMensajeExito('');
      }, 2000);
    } else {
      setMensajeError(resultado.error || 'Error al guardar los datos');
    }
    
    setCargando(false);
  };

  const handleCancelar = () => {
    cargarDatos(); // Recargar datos originales
    setEditando(false);
    setMensajeExito('');
    setMensajeError('');
  };

  if (cargandoDatos) {
    return (
      <div className="info-personal-container loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando tus datos...</p>
      </div>
    );
  }

  return (
    <div className="info-personal-container">
      <div className="info-personal-header">
        <h3>
          <span className="header-icon">📋</span>
          Información Personal
        </h3>
        {!editando ? (
          <button 
            className="btn-editar"
            onClick={() => setEditando(true)}
          >
            <span>✏️</span>
            Editar
          </button>
        ) : (
          <div className="acciones-edicion">
            <button 
              className="btn-cancelar"
              onClick={handleCancelar}
              disabled={cargando}
            >
              <span>❌</span>
              Cancelar
            </button>
            <button 
              className="btn-guardar"
              onClick={handleGuardar}
              disabled={cargando}
            >
              <span>💾</span>
              {cargando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        )}
      </div>

      {mensajeExito && (
        <div className="mensaje-exito">
          {mensajeExito}
        </div>
      )}

      {mensajeError && (
        <div className="mensaje-error">
          ⚠️ {mensajeError}
        </div>
      )}

      <div className="info-personal-form">
        <div className="campo-form">
          <label>DNI:</label>
          <span className="campo-valor">{datos.dni}</span>
        </div>

        <div className="campo-form">
          <label>Nombre completo:</label>
          {editando ? (
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
            />
          ) : (
            <span className="campo-valor">{datos.nombre}</span>
          )}
        </div>

        <div className="campo-form">
          <label>Fecha de nacimiento:</label>
          {editando ? (
            <input
              type="date"
              name="fechaNacimiento"
              value={datos.fechaNacimiento}
              onChange={handleChange}
            />
          ) : (
            <span className="campo-valor">
              {datos.fechaNacimiento || 'No especificada'}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label>Domicilio:</label>
          {editando ? (
            <input
              type="text"
              name="domicilio"
              value={datos.domicilio}
              onChange={handleChange}
              placeholder="Ingresa tu domicilio"
            />
          ) : (
            <span className="campo-valor">
              {datos.domicilio || 'No especificado'}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label>Teléfono:</label>
          {editando ? (
            <input
              type="tel"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              placeholder="11 2345-6789"
            />
          ) : (
            <span className="campo-valor">
              {datos.telefono || 'No especificado'}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label>Correo electrónico:</label>
          {editando ? (
            <input
              type="email"
              name="email"
              value={datos.email}
              onChange={handleChange}
              placeholder="email@ejemplo.com"
            />
          ) : (
            <span className="campo-valor">{datos.email}</span>
          )}
        </div>
      </div>

      {editando && (
        <div className="nota-edicion">
          <small>⚠️ Los campos DNI no se puede editar</small>
        </div>
      )}
    </div>
  );
};

export default InformacionPersonal;