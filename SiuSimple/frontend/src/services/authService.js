import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
    async login(dni, password) {
        try {
            console.log('📤 Enviando login a:', API_URL);
            console.log('📤 Datos:', { dni, password });
            
            const response = await axiosInstance.post('/login', {
                dni,
                password
            });
            
            console.log('📥 Respuesta:', response.data);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
            }
            
            return { success: true, data: response.data };
        } catch (error) {
            console.error('❌ Error completo:', error);
            console.error('❌ Response:', error.response);
            console.error('❌ Request:', error.request);
            
            return { 
                success: false, 
                error: error.response?.data?.error || 'Error de conexión con el servidor'
            };
        }
    },

  // Login con DNI
  async login(dni, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        dni,        // 🔥 Cambiamos email por dni
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  // Obtener perfil
  async getPerfil() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token');
    }

    try {
      const response = await axios.get(`${API_URL}/perfil`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener perfil' };
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
};

// Configuración de axios con CORS
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});



export default authService;