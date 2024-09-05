import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const axiosInstance = axios.create();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

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

    // 응답 인터셉터 설정
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status) {
          const status = error.response.status;
          navigate(`/error/${status}`);
        }
        return Promise.reject(error);
      }
    );

    verifyToken().then(decoded => {
      if (decoded) {
        setUser(decoded);
        setIsAdmin(decoded.role === 'admin');
      }
    }).catch(error => {
      logout();
    });
  }, [token]);

  const login = (username, password) => {
    axios.post('/api/auth', { username, password })
      .then(response => {
        const payload = response.data.payload;
        setUser(payload);
        setIsAdmin(payload.role === 'admin');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        console.error('Failed to login', error);
      });
  };

  const logout = () => {
    console.log("logged out.");
    setUser(null);
    setIsAdmin(false);
    setToken('');
    localStorage.removeItem('token');
  };

  const verifyToken = async () => {
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}