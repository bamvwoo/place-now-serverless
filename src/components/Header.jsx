import { useState, useEffect } from "react"
import axios from 'axios';
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";

export default function Header() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.get('/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Not authenticated', error);
            });
        }
    }, [token]);

    const login = () => {
        axios.post('/api/auth/login', { username: 'user', password: 'password' })
        .then(response => {
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

    const [isDarkMode, setDarkMode] = useState(false);
    const logo = isDarkMode ? logoLight : logoDark;

    return (
        <header>
            <img id="mainLogo" src={logo} alt="Logo" width="150" height="auto" />
            {
                user ? (
                    <div>
                        <span>{ user.nickname }({ user.username })</span>
                        <button onClick={logout}>로그아웃</button>
                    </div>
                ) : (
                    <button onClick={login}>로그인</button>
                )
            }
        </header>
    )
}