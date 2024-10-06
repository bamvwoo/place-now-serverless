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
        sendError(error);
        return Promise.reject(error);
      }
    );

    const localToken = token || localStorage.getItem('token');
    if (localToken) {
      login(localToken);
    }
  }, [ token ]);

  const login = async (token) => {
    try {
      const response = await axios.post('/api/login', { token });
      const user = response.data;

      setToken(token);
      setUser(user);
      setIsAdmin(user.role === 'administrator');
      localStorage.setItem('token', token);
    } catch(error) {
      console.error(error);
      logout();

      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setToken('');
    localStorage.removeItem('token');
  };

  const sendError = (error) => {
    if (error.response && error.response.status) {
      const status = error.response.status;
      const message = error.response.data.error;

      if (status === 401) {
        alert("로그인이 필요해요");
        logout();
      }
      navigate("/error", { state: { status, message } });
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, sendError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}