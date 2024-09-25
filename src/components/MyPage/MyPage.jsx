import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useWindow } from "../../context/WindowContext";
import ContentSwitcher from "./ContentSwitcher";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const LogoutButton = styled.button`
    background-color: transparent;
    border: 1px solid #444;
    padding: 7px 12px;
    border-radius: 5px;
`;

export default function MyPage() {

    const [ activeContent, setActiveContent ] = useState(null);

    const { logout } = useAuth();
    const { closeSidebar } = useWindow();

    const contents = [
        { title: '마이페이지', content: <div>마이페이지입니다</div> },
        { title: '채팅', content: <div>채팅입니다</div> }
    ]

    const handleLogout = (e) => {
        e.preventDefault();
        
        logout();
        closeSidebar();
    };

    return (
        <Wrapper>
            <ContentSwitcher contents={ contents } activeContent={ activeContent } setActiveContent={ setActiveContent }></ContentSwitcher>
            <LogoutButton onClick={ handleLogout }>로그아웃</LogoutButton>
        </Wrapper>
    )
}