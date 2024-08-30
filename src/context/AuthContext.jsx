import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const axiosInstance = axios.create();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    verifyToken().then(decoded => {
      if (decoded) {
        setUser(decoded);
      }
    });
  }, [token]);

  const login = (username, password) => {
    axios.post('/api/auth', { username, password })
      .then(response => {
        setUser(response.data.payload);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        console.error('Failed to login', error);
      });
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
  };

  const verifyToken = async () => {
    if (token) {
      try {
        const response = await axios.get('/api/auth', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.data;
      } catch (error) {
        console.error('Failed to verify token', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}