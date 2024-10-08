import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useWindow } from "../../context/WindowContext";
import ContentSwitcher from "./ContentSwitcher";
import { useState } from "react";
import ChatRoomList from "./ChatRoomList";
import { VerticalWrapper } from "../Common/Wrapper";
import Settings from "./Settings";

const Wrapper = styled(VerticalWrapper)`
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const LogoutButton = styled.button`
    width: 100%;
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

const ContentWrapper = styled.div`
    width: 100%;
    height: calc(100% - 30px);    
`;

export default function MyPage() {

    const contents = [
        { title: '채팅', content: <ChatRoomList /> },
        { title: '내 정보', content: <div>내 정보입니다</div> },
        { title: '설정', content: <Settings /> }
    ];

    const [ activeContent, setActiveContent ] = useState(contents[0]);

    const { logout } = useAuth();
    const { closeSidebar } = useWindow();

    const handleLogout = (e) => {
        e.preventDefault();
        
        logout();
        closeSidebar();
    };

    return (
        <Wrapper>
            <ContentSwitcher contents={ contents } activeContent={ activeContent } setActiveContent={ setActiveContent } />
            <ContentWrapper>
                { activeContent.content }
            </ContentWrapper>
            <LogoutButton onClick={ handleLogout }>로그아웃</LogoutButton>
        </Wrapper>
    )
}