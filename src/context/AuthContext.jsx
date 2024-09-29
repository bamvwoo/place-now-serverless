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
        console.log(token);
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

    const localToken = token || localStorage.getItem('token');
    if (localToken) {
      login(localToken);
    }
  }, [ token ]);

  const login = (token) => {
    axios.post("/api/login", { token })
      .then((response) => {
        const user = response.data;

        setToken(token);
        setIsAdmin(user.role === 'administrator');
        setUser(user);
        localStorage.setItem('token', token);
      })
      .catch((error) => {
        console.error(error);
        logout();
      });
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setToken('');
    localStorage.removeItem('token');
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