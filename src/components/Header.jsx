import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal, { ModalOpenButton } from "./Common/Modal/Modal";
import Login from "./Login/Login";
import styled from "styled-components";

const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    position: relative;

    & > img {
        border-radius: 50%;
    }
`;

const ProfileDropDownContainer = styled.div`
    display: flex;
    padding: 7px 7px 7px 10px;
    border-radius: 5px;
    transition: .2s ease-in-out;

    &:hover {
        background-color: #444;
        color: white;
    }
        
    & > span {
        margin-right: 5px;
    }

    & > i {
        font-size: 0.8rem;
    }
`;

const ProfileDropDownList = styled.ul`
    position: absolute;
    top: 50px;
    right: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    padding: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    
    .dark-mode & {
        background-color: #777;
    }

    .light-mode & {
        background-color: white;
    }
`;

export default function Header() {
    const [ mode, setMode ] = useState(localStorage.getItem('mode') || 'light-mode');
    const [ isDropDownOpen, setIsDropDownOpen ] = useState(false);

    const { user, logout, isAdmin } = useAuth();
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
                    <ProfileContainer>
                        <img src={ user.profile } alt="Profile" width="40" height="40" />

                        <ProfileDropDownContainer ref={ dropDownRef } onClick={ handleDropDownOpen }>
                            <span>{ user.name }</span>
                            <i className="fa-solid fa-chevron-down"></i>
                            
                        </ProfileDropDownContainer>

                        {
                            isDropDownOpen && (
                                <ProfileDropDownList>
                                    <li>마이페이지</li>
                                    <li onClick={ logout }>로그아웃</li>
                                </ProfileDropDownList>
                            )
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