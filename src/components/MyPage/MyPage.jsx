import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useWindow } from "../../context/WindowContext";
import ContentSwitcher from "./ContentSwitcher";
import { useEffect, useState } from "react";
import ChatRoomList from "./ChatRoomList";

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
    transition: .2s ease-in-out;

    &:hover {
        background-color: #444;
        color: #fff;
    }
`;

export default function MyPage() {

    const contents = [
        { title: '채팅', content: <ChatRoomList /> },
        { title: '내 정보', content: <div>내 정보입니다</div> },
        { title: '설정', content: <div>설정입니다</div> }
    ];

    const [ activeContent, setActiveContent ] = useState(contents[0]);

    const { logout } = useAuth();
    const { closeSidebar } = useWindow();

    const handleLogout = (e) => {
        e.preventDefault();
        
        logout();
        closeSidebar();
    };

    useEffect(() => {
    }, [ activeContent ]);

    return (
        <Wrapper>
            <ContentSwitcher contents={ contents } activeContent={ activeContent } setActiveContent={ setActiveContent } />
            { activeContent.content }
            <LogoutButton onClick={ handleLogout }>로그아웃</LogoutButton>
        </Wrapper>
    )
}