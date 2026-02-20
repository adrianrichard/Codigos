import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './HistorialAcademico.css';

const HistorialAcademico = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filtroAño, setFiltroAño] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [materias, setMaterias] = useState([]);

  // Total de materias de la carrera
  const TOTAL_MATERIAS = 35;

  // Datos de ejemplo (después vendrán del backend)
  useEffect(() => {
    setTimeout(() => {
      setMaterias([
        {
          id: 1,
          codigo: 'TEO101',
          nombre: 'Teología Fundamental',
          año: 1,
          cuatrimestre: 1,
          estado: 'aprobada',
          nota: 8,
          fechaAprobacion: '15/12/2024',
          correlativas: []
        },
        {
          id: 2,
          codigo: 'BIB102',
          nombre: 'Introducción a la Biblia',
          año: 1,
          cuatrimestre: 1,
          estado: 'aprobada',
          nota: 9,
          fechaAprobacion: '16/12/2024',
          correlativas: []
        },
        {
          id: 3,
          codigo: 'HIS103',
          nombre: 'Historia de la Iglesia I',
          año: 1,
          cuatrimestre: 2,
          estado: 'aprobada',
          nota: 7,
          fechaAprobacion: '20/12/2024',
          correlativas: ['TEO101']
        },
        {
          id: 4,
          codigo: 'PAT201',
          nombre: 'Patrística',
          año: 2,
          cuatrimestre: 1,
          estado: 'regular',
          nota: null,
          fechaAprobacion: null,
          correlativas: ['HIS103']
        },
        {
          id: 5,
          codigo: 'LIT202',
          nombre: 'Liturgia I',
          año: 2,
          cuatrimestre: 1,
          estado: 'cursando',
          nota: null,
          fechaAprobacion: null,
          correlativas: []
        },
        {
          id: 6,
          codigo: 'FIL203',
          nombre: 'Filosofía',
          año: 2,
          cuatrimestre: 2,
          estado: 'reaprobada',
          nota: 4,
          fechaAprobacion: '10/12/2024',
          correlativas: []
        },
        {
          id: 7,
          codigo: 'MOR301',
          nombre: 'Moral Fundamental',
          año: 3,
          cuatrimestre: 1,
          estado: 'reaprobada',
          nota: 5,
          fechaAprobacion: '05/12/2024',
          correlativas: ['TEO101']
        },
        {
          id: 8,
          codigo: 'DOG302',
          nombre: 'Dogmática',
          año: 3,
          cuatrimestre: 2,
          estado: 'regular',
          nota: null,
          fechaAprobacion: null,
          correlativas: ['PAT201']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // ===== CÁLCULOS DE ESTADÍSTICAS =====
  const materiasAprobadas = materias.filter(m => m.estado === 'aprobada' && m.nota >= 6);
  
  // Materias aprobadas con aplazo (nota entre 1 y 5)
  const materiasAplazos = materias.filter(m => m.estado === 'aprobada' && m.nota < 6);
  
  // Materias aprobadas sin aplazos (nota >= 6)
  const materiasSinAplazos = materiasAprobadas;

  const materiasFiltradas = materias
  .filter(m => m.estado === 'aprobada')
  .filter(m => {
    if (filtroAño !== 'todos' && m.año !== parseInt(filtroAño)) return false;
    if (filtroEstado !== 'todos' && m.estado !== filtroEstado) return false;
    return true;
  });

  // Materias aprobadas (nota >= 6)

  
  // Porcentaje de avance
  const porcentajeAvance = ((materiasAprobadas.length / TOTAL_MATERIAS) * 100).toFixed(1);
  
  // Promedio CON aplazos (incluye todas las notas)
  const notasConAplazos = materias
    .filter(m => m.estado === 'aprobada' && m.nota)
    .map(m => m.nota);
  const promedioConAplazos = notasConAplazos.length > 0
    ? (notasConAplazos.reduce((a, b) => a + b, 0) / notasConAplazos.length).toFixed(2)
    : '0.00';
  
  // Promedio SIN aplazos (solo notas >= 6)
  const notasSinAplazos = materias
    .filter(m => m.estado === 'aprobada' && m.nota >= 6)
    .map(m => m.nota);
  const promedioSinAplazos = notasSinAplazos.length > 0
    ? (notasSinAplazos.reduce((a, b) => a + b, 0) / notasSinAplazos.length).toFixed(2)
    : '0.00';

  // Estadísticas resumidas
  const estadisticas = {
    aprobadas: materiasAprobadas.length,
    aplazos: materiasAplazos.length,
    regulares: materias.filter(m => m.estado === 'regular').length,
    cursando: materias.filter(m => m.estado === 'cursando').length,
    total: materias.length
  };

  if (loading) {
    return (
      <div className="loading-historial">
        <div className="spinner"></div>
        <p>Cargando historial académico...</p>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <div className="historial-header">
        <h2>
          <span className="header-icon">📊</span>
          Historial Académico
        </h2>
        
        <div className="filtros-container">
          <select 
            className="filtro-select"
            value={filtroAño}
            onChange={(e) => setFiltroAño(e.target.value)}
          >
            <option value="todos">Todos los años</option>
            <option value="1">1° Año</option>
            <option value="2">2° Año</option>
            <option value="3">3° Año</option>
            <option value="4">4° Año</option>
          </select>
          
          <select 
            className="filtro-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            <option value="aprobada">Aprobadas</option>
            <option value="regular">Regulares</option>
            <option value="cursando">Cursando</option>
          </select>
        </div>
      </div>

      {/* ===== TARJETAS DE ESTADÍSTICAS ===== */}
      <div className="estadisticas-grid">
        <div className="estadistica-card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div className="estadistica-valor">{estadisticas.aprobadas}</div>
          <div className="estadistica-label">Materias Aprobadas</div>
          <div className="estadistica-detalle">{TOTAL_MATERIAS} totales</div>
        </div>
        
        <div className="estadistica-card" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
          <div className="estadistica-valor">{porcentajeAvance}%</div>
          <div className="estadistica-label">Avance de carrera</div>
          <div className="estadistica-detalle">{materiasAprobadas.length} de {TOTAL_MATERIAS}</div>
        </div>
        
        <div className="estadistica-card" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
          <div className="estadistica-valor">{promedioConAplazos}</div>
          <div className="estadistica-label">Promedio CON aplazos</div>
          <div className="estadistica-detalle">Incluye notas &lt; 6</div>
        </div>
        
        <div className="estadistica-card" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'}}>
          <div className="estadistica-valor">{promedioSinAplazos}</div>
          <div className="estadistica-label">Promedio SIN aplazos</div>
          <div className="estadistica-detalle">Solo notas ≥ 6</div>
        </div>
      </div>



      {/* ===== TABLA DE MATERIAS ===== */}
      <div className="tabla-container">
        <h3 className="section-title">
          <span className="section-icon">📋</span>
          Notas de Exámenes Finales
        </h3>

        <table className="materias-tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Materia</th>
              <th>Año</th>
              <th>Cuat.</th>
              <th>Nota</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {materiasFiltradas.map(materia => (
              <tr key={materia.id}>
                <td className="codigo">{materia.codigo}</td>
                <td className="nombre">{materia.nombre}</td>
                <td className="centrado">{materia.año}°</td>
                <td className="centrado">{materia.cuatrimestre}°</td>
                <td className={`nota ${materia.nota < 6 ? 'aplazo' : ''}`}>
                  {materia.nota}
                </td>
                <td className="centrado">{materia.fechaAprobacion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {materiasFiltradas.length === 0 && (
          <div className="empty-state">
            <p>No hay materias aprobadas para mostrar</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default HistorialAcademico;