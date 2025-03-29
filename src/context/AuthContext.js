import React, { createContext, useState, useEffect } from 'react';
import { login, logout as authLogout, getLoggedInUser } from '../services/authService';
import LoadingIndicator from '../components/LoadingIndicator'; // Импорт индикатора загрузки
import { Alert } from 'react-native';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getLoggedInUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        Alert.alert('Ошибка загрузки пользователя', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const authContextValue = {
    user,
    setUser,
    login: async (username, password) => {
      setLoading(true);
      try {
        const result = await login(username, password);
        if (result.success) {
          setUser(result.user);
        } else {
          Alert.alert('Ошибка входа', result.message);
        }
        return result;
      } catch (error) {
        Alert.alert('Ошибка входа', error.message);
        return { success: false, message: error.message };
      } finally {
        setLoading(false);
      }
    },
    logout: async () => {
      setLoading(true);
      try {
        await authLogout();
        setUser(null);
      } catch (error) {
        Alert.alert('Ошибка выхода', error.message);
      } finally {
        setLoading(false);
      }
    },
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <LoadingIndicator /> : children}
    </AuthContext.Provider>
  );
}