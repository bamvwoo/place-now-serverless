import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Common/Modal/Modal";
import Login from "../pages/Login";

export default function Header() {
    const [ mode, setMode ] = useState(localStorage.getItem('mode') || 'light-mode');
    const { user, logout, isAdmin } = useAuth();
    const logo = mode === 'dark-mode' ? logoLight : logoDark;

    const navigate = useNavigate();

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
            <img id="mainLogo" src={logo} alt="Logo" width="150" height="auto" onClick={ () => { location.href = '/' } } />
            {
                user ? (
                    <div>
                        <span>{ user.name }({ user.userId })</span>
                        <button onClick={ logout }>로그아웃</button>
                    </div>
                ) : (
                    <Modal openText="로그인">
                        <Login />
                    </Modal>
                )
            }

            {
                user && isAdmin && (
                    <button onClick={ () => navigate('/admin') }>관리자</button>
                )
            }
            {/* <button onClick={ toggleMode }>{ mode === 'light-mode' ? '다크모드' : '라이트모드' }</button> */}
        </header>
    )
}