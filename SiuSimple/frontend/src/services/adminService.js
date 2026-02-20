import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const adminService = {
  // Obtener todos los alumnos
  async obtenerAlumnos() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alumnos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al obtener alumnos'
      };
    }
  },

  // Obtener un alumno por ID
  async obtenerAlumno(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/alumnos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al obtener alumno'
      };
    }
  },

  // Crear nuevo alumno
  async crearAlumno(alumno) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/alumnos`, alumno, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al crear alumno'
      };
    }
  },

  // Actualizar alumno
  async actualizarAlumno(id, alumno) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/alumnos/${id}`, alumno, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al actualizar alumno'
      };
    }
  },

  // Eliminar alumno
  async eliminarAlumno(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/alumnos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al eliminar alumno'
      };
    }
  }
};

export default adminService;