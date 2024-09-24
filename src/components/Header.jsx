import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Common/Modal/Modal";
import Login from "./Login/Login";
import styled from "styled-components";
import { useChat } from "../context/ChatContext";
import { useSidebar } from "../context/SidebarContext";

const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    position: relative;
    padding: 5px 7px;
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
    }

    & > img {
        border-radius: 50%;
        margin-right: 5px;
    }

    &:has(> div) {
        padding: 5px 12px 5px 7px;
    }
`;

const UnreadMark = styled.div`
    position: absolute;
    top: 12px;
    right: 5px;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
`;

export default function Header() {
    const [ mode, setMode ] = useState(localStorage.getItem('mode') || 'light-mode');
    const [ isDropDownOpen, setIsDropDownOpen ] = useState(false);

    const { user, logout, isAdmin } = useAuth();
    const { unreadMessages } = useChat();
    const { toggleSidebar } = useSidebar();

    const logo = mode === 'dark-mode' ? logoLight : logoDark;

    const navigate = useNavigate();
    const location = useLocation();

    const dropDownRef = useRef(null);

    useEffect(() => {
        document.getElementById('wrapper').className = mode;

        dropDownRef.current && document.addEventListener('click', (e) => {
            if (!dropDownRef.current.contains(e.target)) {
                setIsDropDownOpen(false);
            }
        });
    }, [ mode, isDropDownOpen ]);

    const handleDropDownOpen = (e) => {
        e.stopPropagation();
        setIsDropDownOpen(!isDropDownOpen);
    };

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
                    <ProfileContainer onClick={ () => { toggleSidebar() } }>
                        <img src={ user.profile } alt="Profile" width="40" height="40" />
                        <span>{ user.name }</span>
                        { 
                            unreadMessages > 0 && 
                            <UnreadMark></UnreadMark> 
                        }
                    </ProfileContainer>
                ) : (
                    !location.pathname.startsWith('/auth') &&
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