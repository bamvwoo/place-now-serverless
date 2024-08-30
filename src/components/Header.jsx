import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
    const [ mode, setMode ] = useState(localStorage.getItem('mode') || 'light-mode');
    const { user, login, logout } = useAuth();
    const logo = mode === 'dark-mode' ? logoLight : logoDark;

    useEffect(() => {
        document.getElementById('wrapper').className = mode;
    }, [ mode ]);

    const toggleMode = () => {
        const newMode = mode === 'light-mode' ? 'dark-mode' : 'light-mode';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    return (
        <header>
            <img id="mainLogo" src={logo} alt="Logo" width="150" height="auto" />
            {
                user ? (
                    <div>
                        <span>{ user.name }({ user.userId })</span>
                        <button onClick={ logout }>로그아웃</button>
                    </div>
                ) : (
                    <button onClick={ () => login() }>로그인</button>
                )
            }
            <button onClick={ toggleMode }>{ mode === 'light-mode' ? '다크모드' : '라이트모드' }</button>
        </header>
    )
}