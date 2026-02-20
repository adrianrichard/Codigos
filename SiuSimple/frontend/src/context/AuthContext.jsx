import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario al cargar la app
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Verificar token con backend
      verificarToken();
    }
    setLoading(false);
  }, []);

  const verificarToken = async () => {
    try {
      const perfil = await authService.getPerfil();
      setUser(perfil);
    } catch (error) {
      authService.logout();
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      setUser(response.usuario);
      return { success: true, data: response };
    } catch (error) {
      setError(error.error || 'Error al iniciar sesión');
      return { success: false, error: error.error };
    }
  };

  const register = async (nombre, email, password) => {
    try {
      setError(null);
      const response = await authService.register(nombre, email, password);
      return { success: true, data: response };
    } catch (error) {
      setError(error.error || 'Error al registrarse');
      return { success: false, error: error.error };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: authService.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};