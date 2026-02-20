import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import logo from '../assets/logo.jpg';
const Login = () => {
  const [dni, setDni] = useState('');           // 🔥 Cambiamos email por dni
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [dniError, setDniError] = useState(''); // Para validación en tiempo real
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔥 VALIDACIÓN DE DNI EN TIEMPO REAL
  const validarDNI = (valor) => {
    // Solo permitir números
    const soloNumeros = valor.replace(/\D/g, '');
    
    // Validar longitud (7-8 dígitos)
    if (soloNumeros.length > 0 && (soloNumeros.length < 7 || soloNumeros.length > 8)) {
      setDniError('El DNI debe tener 7 u 8 dígitos');
    } else {
      setDniError('');
    }
    
    return soloNumeros;
  };

  const handleDNIChange = (e) => {
    const valor = e.target.value;
    const dniLimpio = validarDNI(valor);
    setDni(dniLimpio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar DNI antes de enviar
    if (dni.length < 7 || dni.length > 8) {
      setLocalError('El DNI debe tener 7 u 8 dígitos');
      return;
    }
    
    setIsLoading(true);
    setLocalError('');

    const result = await login(dni, password);  // Enviamos dni
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          {logo ? (
            <img src={logo} alt="Fons Vitae" className="login-logo" />
          ) : (
            <div className="logo-placeholder">📚</div> // Emoji como respaldo
          )}
        </div>

        <h2>Iniciar Sesión</h2>
        
        {localError && (
          <div className="alert alert-error">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              className="form-control"
              value={dni}
              onChange={handleDNIChange}
              placeholder="12345678"
              maxLength="8"
              required
            />
            {dniError && <small className="error-text">{dniError}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading || dniError !== ''}
          >
            {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;