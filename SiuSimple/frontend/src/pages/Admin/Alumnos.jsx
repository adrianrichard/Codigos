import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../services/adminService';
import './Alumnos.css';

const Alumnos = () => {
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [busqueda, setBusqueda] = useState('');

  // Estado para el formulario
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    password: ''
  });

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    setLoading(true);
    const resultado = await adminService.obtenerAlumnos();
    if (resultado.success) {
      setAlumnos(resultado.data);
    } else {
      mostrarMensaje('error', resultado.error);
    }
    setLoading(false);
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const abrirModalNuevo = () => {
    setEditando(null);
    setFormData({
      dni: '',
      nombre: '',
      password: ''
    });
    setShowModal(true);
  };

  const abrirModalEditar = (alumno) => {
    setEditando(alumno);
    setFormData({
      dni: alumno.dni,
      nombre: alumno.nombre,
      password: '' // No mostrar la contraseña actual
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dni || !formData.nombre) {
      mostrarMensaje('error', 'DNI y nombre son obligatorios');
      return;
    }

    if (!editando && !formData.password) {
      mostrarMensaje('error', 'La contraseña es obligatoria para nuevos alumnos');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      mostrarMensaje('error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(formData.dni)) {
      mostrarMensaje('error', 'El DNI debe tener 7 u 8 dígitos numéricos');
      return;
    }

    let resultado;
    if (editando) {
      resultado = await adminService.actualizarAlumno(editando.id, formData);
    } else {
      resultado = await adminService.crearAlumno(formData);
    }

    if (resultado.success) {
      mostrarMensaje('success', editando ? 'Alumno actualizado' : 'Alumno creado');
      setShowModal(false);
      cargarAlumnos();
    } else {
      mostrarMensaje('error', resultado.error);
    }
  };

  const handleEliminar = async (id, dni, nombre) => {
    if (dni === '12345678') {
      mostrarMensaje('error', 'No se puede eliminar al administrador principal');
      return;
    }

    if (!window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      return;
    }

    const resultado = await adminService.eliminarAlumno(id);
    if (resultado.success) {
      mostrarMensaje('success', 'Alumno eliminado');
      cargarAlumnos();
    } else {
      mostrarMensaje('error', resultado.error);
    }
  };

  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    alumno.dni.includes(busqueda)
  );

  return (
    <div className="admin-alumnos-container">
      <div className="admin-header">
        <h2>
          <span className="header-icon">👥</span>
          Gestión de Alumnos
        </h2>
        <button className="btn-nuevo" onClick={abrirModalNuevo}>
          <span>➕</span>
          Nuevo Alumno
        </button>
      </div>

      {mensaje.texto && (
        <div className={`mensaje ${mensaje.tipo}`}>
          {mensaje.tipo === 'success' ? '✅' : '⚠️'} {mensaje.texto}
        </div>
      )}

      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-input"
        />
        <span className="resultados-count">
          {alumnosFiltrados.length} alumnos
        </span>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando alumnos...</p>
        </div>
      ) : (
        <div className="alumnos-grid">
          {alumnosFiltrados.map(alumno => (
            <div key={alumno.id} className="alumno-card">
              <div className="alumno-header">
                <span className="alumno-avatar">
                  {alumno.nombre.charAt(0).toUpperCase()}
                </span>
                <div className="alumno-info">
                  <h3>{alumno.nombre}</h3>
                  <p className="alumno-dni">DNI: {alumno.dni}</p>
                </div>
              </div>
              
              <div className="alumno-footer">
                <button
                  className="btn-editar"
                  onClick={() => abrirModalEditar(alumno)}
                >
                  ✏️ Editar
                </button>
                {alumno.dni !== '12345678' && (
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(alumno.id, alumno.dni, alumno.nombre)}
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para crear/editar */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <h3>{editando ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  placeholder="12345678"
                  maxLength="8"
                  disabled={editando} // No permitir editar DNI si es edición
                />
              </div>

              <div className="form-group">
                <label>Nombre completo:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre completo"
                />
              </div>

              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={editando ? 'Dejar vacío para no cambiar' : 'Mínimo 6 caracteres'}
                />
                {editando && (
                  <small className="form-hint">
                    Dejar vacío para mantener la contraseña actual
                  </small>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-guardar"
                >
                  {editando ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alumnos;