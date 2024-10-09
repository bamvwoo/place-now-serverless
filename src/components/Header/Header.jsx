import logoLight from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.svg";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import styled from "styled-components";
import { useWindow } from "../../context/WindowContext";
import Profile from "./Profile";

const GlobalLogo = styled.img`
    width: 30px;
    height: auto;
    cursor: pointer;
`;

const LoginButton = styled.button`
    background-color: transparent;
    border: 1px solid #444;
    padding: 7px 12px;
    border-radius: 5px;
`;

export default function Header() {
    /* States */
    const [ mode, setMode ] = useState(localStorage.getItem('mode') || 'light-mode');
    
    /* Hooks */
    const location = useLocation();

    /* Custom Hooks  */
    const { user, isAdmin } = useAuth();
    const { openModal } = useWindow();

    /* Local Variables */
    const logo = mode === 'dark-mode' ? logoLight : logoDark;

    const openLogin = (e) => {
        e.preventDefault();
        openModal(null, <Login />);
    };

    useEffect(() => {
        console.log("work");
        document.getElementById('wrapper').className = mode;
    }, [ mode ]);

    return (
        <header>
            <GlobalLogo src={logo} alt="Logo" onClick={ () => { window.location.href = '/' } } />
            {
                user ? (
                    <Profile />
                ) : (
                    !location.pathname.startsWith('/auth') && 
                        <LoginButton onClick={ openLogin }>로그인</LoginButton>
                )
            }
        </header>
    )
}