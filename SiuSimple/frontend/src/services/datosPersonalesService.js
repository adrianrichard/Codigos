import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const datosPersonalesService = {
  // Obtener datos personales por DNI
  async obtenerPorDNI(dni) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/datos-personales/${dni}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al obtener datos' 
      };
    }
  },

  // Guardar datos personales
  async guardar(datos) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/datos-personales`, datos, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error guardando datos:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al guardar datos' 
      };
    }
  }
};

export default datosPersonalesService;