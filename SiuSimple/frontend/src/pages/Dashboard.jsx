import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import InformacionPersonal from '../components/InformacionPersonal';
import InscripcionFinales from './InscripcionFinales';
import HistorialAcademico from './HistorialAcademico';
import Alumnos from './Admin/Alumnos';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState('info');

  useEffect(() => {
    cargarPerfil();
  }, []);

  useEffect(() => {
    // Si es admin y la sección activa es 'info', cambiar a otra
    if (user?.rol === 'admin' && seccionActiva === 'info') {
      setSeccionActiva('finales');
    }
  }, [user, seccionActiva]);

  const cargarPerfil = async () => {
    try {
      const data = await authService.getPerfil();
      setPerfil(data);
    } catch (error) {
      console.error('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>📚 SIU - Fons Vitae</h1>
        <div className="user-info">
          <span className="user-greeting">Hola, {user?.nombre}</span>
          <button onClick={handleLogout} className="btn-logout">
            <span className="logout-icon"></span>
            <span className="logout-text">Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Menú de secciones */}
        <div className="secciones-menu">
          {/* Información Personal - SOLO para alumnos */}
          {user?.rol !== 'admin' && (
            <button 
              className={`seccion-btn ${seccionActiva === 'info' ? 'activa' : ''}`}
              onClick={() => setSeccionActiva('info')}
            >
              <span className="seccion-icono">📋</span>
              <span>Información Personal</span>
            </button>
          )}
          
          {/* Inscripción a Finales - para todos */}
          <button 
            className={`seccion-btn ${seccionActiva === 'finales' ? 'activa' : ''}`}
            onClick={() => setSeccionActiva('finales')}
          >
            <span className="seccion-icono">📝</span>
            <span>Inscripción a Finales</span>
          </button>
          
          {/* Historial Académico - para todos */}
          <button 
            className={`seccion-btn ${seccionActiva === 'historial' ? 'activa' : ''}`}
            onClick={() => setSeccionActiva('historial')}
          >
            <span className="seccion-icono">📊</span>
            <span>Historial Académico</span>
          </button>
          
          {/* Gestión de Alumnos - SOLO para admin */}
          {user?.rol === 'admin' && (
            <button 
              className={`seccion-btn ${seccionActiva === 'admin-alumnos' ? 'activa' : ''}`}
              onClick={() => setSeccionActiva('admin-alumnos')}
            >
              <span className="seccion-icono">👥</span>
              <span>Gestionar Alumnos</span>
            </button>
          )}
        </div>

        {/* Contenido de la sección activa */}
        <div className="seccion-contenido">
          {/* Información Personal - SOLO para alumnos */}
          {seccionActiva === 'info' && user?.rol !== 'admin' && <InformacionPersonal />}
          
          {/* Inscripción a Finales - para todos */}
          {seccionActiva === 'finales' && <InscripcionFinales />}
          
          {/* Historial Académico - para todos */}
          {seccionActiva === 'historial' && <HistorialAcademico />}
          
          {/* Gestión de Alumnos - SOLO para admin */}
          {seccionActiva === 'admin-alumnos' && user?.rol === 'admin' && <Alumnos />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;